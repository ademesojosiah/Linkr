import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Link } from "./link.schema";



@Schema({
    timestamps:true
})
export class Click extends Document{

    @Prop({required:false})
    location:string

    @Prop({required:true})
    ip:string

    @Prop({required:true})
    agent:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Link.name})
    linkId:mongoose.Schema.Types.ObjectId


}

export const clickSchema = SchemaFactory.createForClass(Click)