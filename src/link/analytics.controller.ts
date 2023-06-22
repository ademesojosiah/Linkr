import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Res,
  Delete,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './schema/link.schema';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller('api')
export class AnalyticsController {
  constructor(private readonly linkService: LinkService) {}

  //get links
  @UseGuards(JwtAuthGuard)
  @Get('/links')
  async getLinks(@Req() req:any):Promise<Link[]>{
    const {user:{userId}} = req
    console.log({userId:userId});
    return await this.linkService.getAllLinks(userId);
  }

  //get link by Id
  @UseGuards(JwtAuthGuard)
  @Get('link/:id')
  async getLinkById(@Param('id') id:string, @Req() req:any){ 
    return await this.linkService.getLinkById(id,req.user.userId)
  }

  //delete link by Id
  @UseGuards(JwtAuthGuard)
  @Delete('link/:id')
  async deleteLink(@Param('id') id:string, @Req() req:any){
    return this.linkService.deleteLink(id,req.user.userId)
  }
}

