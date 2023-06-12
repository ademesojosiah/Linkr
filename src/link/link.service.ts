import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { Link } from './schema/link.schema';
import * as mongoose from 'mongoose';
import { creatLinkDto } from './dto/createLink.dto';

@Injectable()
export class LinkService {

    constructor(
        @InjectModel(Link.name)
        private linkModel:mongoose.Model<Link>
    ){}


    create(body:creatLinkDto,generatedLink:string):Promise<Link>{
        const newLink = this.linkModel.create({...body,shortLink:generatedLink})
        return newLink

    }
}
