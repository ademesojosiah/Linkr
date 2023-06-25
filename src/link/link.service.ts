import { HttpException, HttpStatus, Injectable , Inject} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './schema/link.schema';
import * as mongoose from 'mongoose';
import { creatLinkDto } from './dto/createLink.dto';
import { Icached, linkSearch } from './interface/link.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Click } from './schema/clicks.schema';


@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: mongoose.Model<Link>,
    @InjectModel(Click.name)
    private clickModel: mongoose.Model<Click>,
    @Inject(CACHE_MANAGER) private cacheService:Cache 
  ) {}

  async create(body: creatLinkDto, generatedLink: string): Promise<Link> {
    try {
      const newLink = await this.linkModel.create({
        ...body,
        shortLink: generatedLink,
      });
      return newLink;
    } catch (error) {
      console.log(error);

      if (error.code === 11000)
        throw new HttpException(
          `Custom name already exist : ${Object.values(error.keyValue)}`,
          500,
        );
      throw new HttpException(`${error}`|| `internal server error`, 500);
    }
  }

  async getLink(body: linkSearch): Promise<string> {
    try {
      const cached = await this.cacheService.get<Icached>(`${body.shortLink}`)
      if(cached){
        return cached.originalLink
      }
      const link = await this.linkModel.findOneAndUpdate(
        body,
        { $inc: { clicks: 1 } },
        { new: true },
      );
      if(!link)throw new Error("link doesn't exist")
      // await this.clickModel.create()
      await this.cacheService.set(`${body.shortLink}`,link)        
      return link.originalLink;
    } catch (error) {
      throw new HttpException( `${error}`|| `internal server error`, error.status || 500);
    }
  }

  async isAuthor(id: string, userId: string): Promise<boolean> {
    const isAuthor = await this.linkModel.findOne({ _id: id, userId: userId });
    if (!isAuthor) {
      throw new Error('Link not found');
    }
    return true;
  }

  async getAllLinks(id: string): Promise<Link[]> {
    try {
      const links = await this.linkModel
        .find({ userId: id })
        .populate({ path: 'userId', select: '_id username email' });
      return links;
    } catch (error) {
      throw new HttpException( `${error}`|| `internal server error`, error.status || 500);
    }
  }

  async getLinkById(id: string, userId: string): Promise<Link> {
    try {
      await this.isAuthor(id, userId);
      const link = await this.linkModel
        .findById(id)
        .populate({ path: 'userId', select: '_id username email' });
      return link;
    } catch (error) {
      console.log(error);
      throw new HttpException( `${error}`|| `internal server error`, error.status || 500);
    }
  }

  async deleteLink(id: string, userId: string): Promise<any> {
    await this.isAuthor(id, userId);
    try {
      const link = await this.linkModel.deleteOne({ _id: id });
      return link;
    } catch (error) {
      throw new HttpException( `${error}`|| `internal server error`, error.status || 500);
    }
  }
}
