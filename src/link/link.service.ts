import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { Link } from './schema/link.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class LinkService {

    constructor(
        @InjectModel(Link.name)
        private linkModel:mongoose.Model<Link>
    ){}


    create(){}
}
