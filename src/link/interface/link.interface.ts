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