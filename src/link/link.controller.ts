import { Body, Controller, Post, HttpException, HttpStatus, Get, Param, UseGuards, Req, Res } from '@nestjs/common';
import { LinkService } from './link.service';
import { creatLinkDto } from './dto/createLink.dto';
import { isValidUrl } from './utils/utils';
import { nanoid } from 'nanoid';
import { Link } from './schema/link.schema';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request, Response } from 'express';

@Controller()
@UseGuards(JwtAuthGuard)
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // short url generator
  @Post('create')
  async createLink(@Body() body:creatLinkDto,  @Req() req:any):Promise<Link>  {
    const {user:{userId}} = req
    const newBody = {...body,userId:userId} 
    
    const valid = isValidUrl(newBody?.originalLink?.trim())

    const urlId = nanoid(6);
    const {customLink} = newBody
    const trimmedCustomLink = customLink?.trim()
    if(!trimmedCustomLink){
      newBody.customLink = undefined
      const shortLink = `${process.env.BASE}/${urlId}`
      return await this.linkService.create(newBody,shortLink)
    }

      const shortLink = `${process.env.BASE}/${customLink}`
      newBody.customLink = undefined
    return await this.linkService.create(newBody,shortLink)


  }

  @Get(':param')
  async redirect(@Param('param') param:string, @Res() res: Response):Promise<void>{
    param =  `${process.env.BASE}/${param}`
    const originalLink = await this.linkService.getLink({shortLink:param})
   return res.redirect(`${originalLink}`)
  }
}
