import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";



@Schema({
    timestamps:true
})
export class Link{

    @Prop()
    originalLink:string

    @Prop()
    shortenedLink:string


}

export const linkSchema = SchemaFactory.createForClass(Link)