import { Auth } from "../schema/auth.schema";

export interface loginResponse{

}

export interface registerResponse{
    user:UserI
    token:string
}

export interface UserI{
    _id:string;
    username:string;
    email:string;
    password?:string;
    createdAt?:Date,
    updatedAt?:Date
}