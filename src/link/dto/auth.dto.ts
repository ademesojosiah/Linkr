import {IsNotEmpty} from 'class-validator'

export class creatLinkDto{
    @IsNotEmpty({message:'please input your username'})
    username : string;

    @IsNotEmpty({message:'Please input your email'})
    email:string;

    @IsNotEmpty({message:'Please input your password'})
    password : string;
}