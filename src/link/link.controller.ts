import { Body, Controller, Post, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { LinkService } from './link.service';
import { creatLinkDto } from './dto/createLink.dto';
import { isValidUrl } from './utils/utils';
import { nanoid } from 'nanoid';
import { Link } from './schema/link.schema';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // short url generator
  @Post('create')
  async getLink(@Body() body:creatLinkDto):Promise<Link>  {

    const valid = isValidUrl(body.originalLink.trim())

    const urlId = nanoid(6);
    const {customLink} = body
    const trimmedCustomLink = customLink?.trim()
    if(!trimmedCustomLink){
      body.customLink = undefined
      const shortLink = `${process.env.BASE}/${urlId}`
      return await this.linkService.create(body,shortLink)
    }

      const shortLink = `${process.env.BASE}/${customLink}`
      body.customLink = undefined
    return await this.linkService.create(body,shortLink)


  }

  @Get(':param')
  async get(@Param(":param") param:string ){
   return await this.linkService.getLink({shortLink:param})
  }
}
