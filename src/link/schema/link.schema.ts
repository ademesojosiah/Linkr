import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";



@Schema({
    timestamps:true
})
export class Link{

    @Prop({required:true})
    originalLink:string

    @Prop({required:true})
    shortLink:string

    @Prop()
    clicks:number;

}

export const linkSchema = SchemaFactory.createForClass(Link)