import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './schema/auth.schema';
import { signUpDto } from './dto/signUp.dto';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserI, registerResponse } from './interface/loginResonse.interface';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(dto: signUpDto): Promise<registerResponse> {
    try {
        log(dto)
      const existingEmail = await this.authModel.findOne({ email: dto.email });
      if (existingEmail) throw new ConflictException('email already exists');
      const newUser = await this.authModel.create(dto);
      const payload:{userId:string,username:string,email:string} = {
        userId:newUser._id,
        username:newUser.username,
        email:newUser.email
      }
      const token:string = await this.jwtService.sign(payload)

      const userInfo:UserI = {
        _id:newUser._id,
        username:newUser.username,
        email:newUser.email,
      }

      return {user:userInfo,token}
    } catch (error) {
        log(error)
      throw new HttpException(`internal server error ; ${error}`, 500);
    }
  }


}
