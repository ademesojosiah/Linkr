import { Module } from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import {APP_GUARD} from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),

    ThrottlerModule.forRoot({
      ttl : 60,
      limit : 10,
   }),
 
    MongooseModule.forRoot(process.env.MONGO_URI),
    CacheModule.register({
      isGlobal:true
    }),
    LinkModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService,   {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
