import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { linkSchema } from './schema/link.schema';
import { JwtAuthGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'Link',schema:linkSchema}])],
  controllers: [LinkController,AnalyticsController],
  providers: [LinkService,JwtStrategy]
})
export class LinkModule {}
