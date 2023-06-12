import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";



@Schema({
    timestamps:true
})
export class Link{

    @Prop()
    originalLink:string

    @Prop()
    shortLink:string

    @Prop()
    clicks:number;

}

export const linkSchema = SchemaFactory.createForClass(Link)