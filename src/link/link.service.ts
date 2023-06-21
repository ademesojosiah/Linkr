import { HttpException, Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { Link } from './schema/link.schema';
import * as mongoose from 'mongoose';
import { creatLinkDto } from './dto/createLink.dto';
import { linkSearch } from './interface/link.interface';

@Injectable()
export class LinkService {

    constructor(
        @InjectModel(Link.name)
        private linkModel:mongoose.Model<Link>
    ){}


    async create(body:creatLinkDto,generatedLink:string):Promise<Link>{
        try {
        const newLink = await this.linkModel.create({...body,shortLink:generatedLink})
        return newLink   
        } catch (error) {
            if (error.code === 11000)
            throw new HttpException(
              `Custom name already exist : ${Object.values(error.keyValue)}`,
              500,
            );
          throw new HttpException(`internal server; ${error}`, 500);
        }
       
    }


    async getLink(body:linkSearch){
        try {
            const link = await this.linkModel.findOne(body)
            return link
        } catch (error) {
            
        }
    }
}
