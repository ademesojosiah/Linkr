import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { linkSchema } from './schema/link.schema';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AnalyticsController } from './analytics.controller';
import { clickSchema } from './schema/click.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Link', schema: linkSchema },
      { name: 'Click' , schema:clickSchema},
    ]),
    HttpModule,
    AuthModule
  ],
  controllers: [LinkController, AnalyticsController],
  providers: [LinkService, JwtStrategy],
})
export class LinkModule {}
