import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { linkSchema } from './schema/link.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Link',schema:linkSchema}])],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule {}
