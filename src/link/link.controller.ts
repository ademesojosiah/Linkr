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


    const shortLink = `${process.env.BASE}/${urlId}`
    return this.linkService.create(body,shortLink)
  }
}
