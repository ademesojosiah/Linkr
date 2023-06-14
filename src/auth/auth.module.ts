import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, userSchema } from './schema/auth.schema';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {env} from 'process'
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[MongooseModule.forFeature([{name:Auth.name,schema:userSchema}]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    inject: [ConfigService],
  }),],
  providers:[AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
