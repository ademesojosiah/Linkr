import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { LinkService } from './link.service';
import { creatLinkDto } from './dto/createLink.dto';
import { isValidUrl } from './utils/utils';
import { nanoid } from 'nanoid';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // short url generator
  @Post('create')
  getLink(@Body() body:creatLinkDto): any {

    const valid = isValidUrl(body.originalLink.trim())

    const urlId = nanoid(6);
    console.log(urlId);

    const shortLink = `${process.env.BASE}/${urlId}`
    console.log(shortLink);
    
    
return
    // if(!valid)throw new HttpException('invalid url',HttpStatus.NOT_ACCEPTABLE)
    // this.linkService.create(body,'jojo')

  }
}
