import { ObjectId } from "mongoose";

export interface linkSearch{
    shortLink:string;
}

export interface Icached{
    _id:string;
    originalLink:string;
    shortLink:string;
    userId: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

export interface Ianalytics{
    _id:string;
    location:string;
    ip:string;
    linkId: string;
    agent: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface DeleteResp{
        acknowledged: boolean;
        deletedCount: number;

}

export interface ILink{
    originalLink: string;
    shortLink: string;  
    userId:ObjectId;
    clicks: number;
    _id: ObjectId;
    createdAt?:Date;
    updatedAt?: Date;
    __v?: number;
}

export interface IClick{
    _id: ObjectId;
    ip: string;
    referer: string ;
    location: string;
    agent: string;
    linkId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    _v?:number;
}