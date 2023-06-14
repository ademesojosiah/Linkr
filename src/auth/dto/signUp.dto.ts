import {IsEmail, IsNotEmpty} from 'class-validator'

export class signUpDto{
    @IsNotEmpty({message:'please input your username'})
    username : string;

    @IsNotEmpty({message:'Please input your email'})
    @IsEmail()
    email:string;

    @IsNotEmpty({message:'Please input your password'})
    password : string;
}