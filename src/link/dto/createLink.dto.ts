import {IsNotEmpty, IsOptional} from 'class-validator'

export class creatLinkDto{
    @IsNotEmpty({message:'your body should not be empty'})
    originalLink : string;

    @IsOptional()
    customLink:string;
}