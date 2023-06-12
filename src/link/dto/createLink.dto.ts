import {IsNotEmpty} from 'class-validator'

export class creatLinkDto{
    @IsNotEmpty({message:'your body should not be empty'})
    originalLink : string;
}