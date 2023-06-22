import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './schema/link.schema';
import * as mongoose from 'mongoose';
import { creatLinkDto } from './dto/createLink.dto';
import { linkSearch } from './interface/link.interface';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: mongoose.Model<Link>,
  ) {}

  async create(body: creatLinkDto, generatedLink: string): Promise<Link> {
    try {
      const newLink = await this.linkModel.create({
        ...body,
        shortLink: generatedLink,
      });
      return newLink;
    } catch (error) {
      if (error.code === 11000)
        throw new HttpException(
          `Custom name already exist : ${Object.values(error.keyValue)}`,
          500,
        );
      throw new HttpException(`internal server; ${error}`, 500);
    }
  }

  async getLink(body: linkSearch): Promise<string> {
    try {
      const link = await this.linkModel.findOneAndUpdate(
        body,
        { $inc: { clicks: 1 } },
        { new: true },
      );
      return link.originalLink;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }

  async getAllLinks(id: string): Promise<Link[]> {
    try {
      const links = await this.linkModel.find({ userId: id }).populate('Auth')
      return links;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }

  async getLinkById(id: string): Promise<Link> {
    try {
      const link = await this.linkModel.findOne({ _id: id }).populate('Auth');
      return link;
    } catch (error) {
      throw new HttpException(
        'UnAuthorized, you cant perform this operation',
        401,
      );
    }
  }

  async deleteLink(id: string): Promise<DeleteResult> {
    try {
      const link = await this.linkModel.deleteOne({ _id: id });
      return link;
    } catch (error) {
      throw new HttpException(
        'UnAuthorized , you cant perform this operation',
        401,
      );
    }
  }
}
