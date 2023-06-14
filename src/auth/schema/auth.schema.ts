import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt' ;



@Schema({
    timestamps:true
})
export class Auth extends Document{

    @Prop({unique:true, required:true})
    username:string

    @Prop({unique:true,required:true})
    email:string

    @Prop({required:true,minlength:8})
    password:string;

    isPassword:Function;

}

export const userSchema = SchemaFactory.createForClass(Auth)

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPassword = async function(password:string):Promise<boolean>{
    return await bcrypt.compare(this.password,password)
}
