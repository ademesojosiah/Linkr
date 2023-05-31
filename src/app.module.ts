import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
 
    MongooseModule.forRoot(process.env.MONGO_URI),
    LinkModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
