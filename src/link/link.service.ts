import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './schema/link.schema';
import * as mongoose from 'mongoose';
import { creatLinkDto } from './dto/createLink.dto';
import { linkSearch } from './interface/link.interface';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';
import { Auth } from 'src/auth/schema/auth.schema';

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
      console.log(error);

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
      console.log(error);

      throw new HttpException('Internal server error', 500);
    }
  }

  async isAuthor(id: string, userId: string): Promise<boolean> {
    const isAuthor = await this.linkModel.findOne({ _id: id, userId: userId });
    if (!isAuthor) {
      throw new HttpException('Link not found', 503);
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
      console.log(error);
      throw new HttpException('Internal server error', 500);
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
      if (error.status === 503) throw new HttpException(error.response, 401);
      throw new HttpException('unable to get link', 500);
    }
  }

  async deleteLink(id: string, userId: string): Promise<DeleteResult> {
    await this.isAuthor(id, userId);
    try {
      const link = await this.linkModel.deleteOne({ _id: id });
      return link;
    } catch (error) {
      console.log(error);
      if (error.status === 503) throw new HttpException(error.esponse, 401);
      throw new HttpException('unable to delete link', 500);
    }
  }
}
