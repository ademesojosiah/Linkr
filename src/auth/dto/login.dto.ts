import {IsNotEmpty} from 'class-validator'

export class loginDto{

    @IsNotEmpty({message:'Please input your email'})
    email:string;

    @IsNotEmpty({message:'Please input your password'})
    password : string;
}