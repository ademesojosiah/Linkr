import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Auth } from "src/auth/schema/auth.schema";



@Schema({
    timestamps:true
})
export class Link extends Document{

    @Prop({required:true})
    originalLink:string

    @Prop({required:true})
    shortLink:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Auth.name})
    user:Auth

    @Prop()
    clicks:number;

}

export const linkSchema = SchemaFactory.createForClass(Link)