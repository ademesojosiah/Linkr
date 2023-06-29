import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './schema/link.schema';
import * as mongoose from 'mongoose';
import { creatLinkDto } from './dto/createLink.dto';
import { DeleteResp, Icached, linkSearch } from './interface/link.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Click } from './schema/click.schema';
import * as geoip from 'geoip-country';
@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: mongoose.Model<Link>,
    @InjectModel(Click.name)
    private clickModel: mongoose.Model<Click>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async create(body: creatLinkDto, generatedLink: string): Promise<{success:boolean,link:Link}> {
    try {
      const newLink = await this.linkModel.create({
        ...body,
        shortLink: generatedLink,
      });
      return {success:true,link:newLink};
    } catch (error) {
      console.log(error);

      if (error.code === 11000)
        throw new HttpException(
          `Custom name already exist : ${Object.values(error.keyValue)}`,
          500,
        );
      throw new HttpException(`${error}` || `internal server error`, 500);
    }
  }

  async getLink(body: linkSearch, ip: string, agent: string, referer:string): Promise<string> {
    try {
      const cached = await this.cacheService.get<Icached>(`${body.shortLink}`);
      if (cached) {
        return cached.originalLink;
      }
      const link = await this.linkModel.findOneAndUpdate(
        body,
        { $inc: { clicks: 1 } },
        { new: true },
      );

      
      if (!link) throw new Error("link doesn't exist");

      const geo = geoip.lookup(ip);
      const click = await this.clickModel.create({
        linkId: link._id,
        ip: ip,
        location: geo?.country,
        agent: agent,
        referer: referer? referer:null
      });      
      await this.cacheService.set(`${body.shortLink}`, link, 6000);
      return link.originalLink;
    } catch (error) {
      throw new HttpException(
        `${error}` || `internal server error`,
        error.status || 500,
      );
    }
  }

  async isAuthor(id: string, userId: string): Promise<boolean> {
    const isAuthor = await this.linkModel.findOne({ _id: id, userId: userId });
    if (!isAuthor) {
      throw new Error('Link not found');
    }
    return true;
  }

  async getAllLinks(id: string): Promise<{success:boolean,link:Link[]}> {
    try {
      const links = await this.linkModel
        .find({ userId: id })
      return {success:true,link:links};
    } catch (error) {
      throw new HttpException(
        `${error}` || `internal server error`,
        error.status || 500,
      );
    }
  }

  async getLinkById(id: string, userId: string):Promise<{success:boolean,analytics:Click[],link:Link,noClicks:number}> {
    try {
      await this.isAuthor(id, userId);
      const analytics = await this.clickModel.find(
        { linkId: id }
      );
      const link = await this.linkModel
        .findById(id)
        .populate({ path: 'userId', select: '_id username email' });
      return {success:true, analytics:analytics,link:link,noClicks:analytics.length};
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `${error}` || `internal server error`,
        error.status || 500,
      );
    }
  }

  async deleteLink(id: string, userId: string): Promise<{success:boolean, link:DeleteResp}> {
    await this.isAuthor(id, userId);
    try {
      const link = await this.linkModel.deleteOne({ _id: id });
      return {success:true,link:link};
    } catch (error) {
      throw new HttpException(
        `${error}` || `internal server error`,
        error.status || 500,
      );
    }
  }
}
