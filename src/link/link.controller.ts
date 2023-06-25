import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
  Inject
} from '@nestjs/common';
import { LinkService } from './link.service';
import { creatLinkDto } from './dto/createLink.dto';
import { isValidUrl } from './utils/utils';
import { nanoid } from 'nanoid';
import { Link } from './schema/link.schema';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request, Response } from 'express';
import { CacheInterceptor,CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // short url generator
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createLink(@Body() body: creatLinkDto, @Req() req: any): Promise<Link> {
    const {
      user: { userId },
    } = req;
    const newBody = { ...body, userId: userId };

    const valid = isValidUrl(newBody?.originalLink?.trim());
    if(!valid)throw new Error('link not valid')

    const urlId = nanoid(6);
    const { customLink } = newBody;
    const trimmedCustomLink = customLink?.trim();
    if (!trimmedCustomLink) {
      newBody.customLink = undefined;
      const shortLink = `${process.env.BASE}/${urlId}`;
      return await this.linkService.create(newBody, shortLink);
    }

    const shortLink = `${process.env.BASE}/${customLink}`;
    newBody.customLink = undefined;
    return await this.linkService.create(newBody, shortLink);
  }

  //redirect link
  @Get(':param')
  async redirect(
    @Param('param') param: string,
    @Res() res: Response,
  ): Promise<void> {
    param = `${process.env.BASE}/${param}`;
    const originalLink = await this.linkService.getLink({ shortLink: param });
    return res.redirect(`${originalLink}`);

  }
}
