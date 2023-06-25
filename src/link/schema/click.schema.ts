import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Link } from "./link.schema";



@Schema({
    timestamps:true
})
export class Click extends Document{

    @Prop({required:true})
    location:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Link.name})
    link:mongoose.Schema.Types.ObjectId


}

export const clickSchema = SchemaFactory.createForClass(Click)