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
      const existingEmail = await this.authModel.findOne({ email: dto.email });
      if (existingEmail) throw new ConflictException('email already exists');
      const newUser = await this.authModel.create(dto);
      const payload: { userId: string; username: string; email: string } = {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
      };
      const token: string = this.jwtService.sign(payload);

      const userInfo: UserI = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      };

      return {message:'Account created succesfully', user: userInfo, token };
    } catch (error) {
      if (error.code === 11000)
        throw new HttpException(
          `duplicate username : ${Object.values(error.keyValue)}`,
          401,
        );
      throw new HttpException(`${error}` || `internal server error`, 500);
    }
  }

  async login(dto: loginDto): Promise<{ user: UserI; token: string }> {
    try {
      const { email, password }: { email: string; password: string } = dto;

      const userInfo = await this.validateUser(email, password);

      const payload = {
        userId: userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
      };
      const token = this.jwtService.sign(payload);
      return { user: userInfo, token };
    } catch (error) {
      throw new HttpException(`${error}` || `internal server error`, 500);
    }
  }

  async validateUser(email: string, password: string): Promise<UserI> {
    const user = await this.authModel.findOne({ email: email });

    if (!(await user.isPassword(password))) {
      throw new HttpException('wrong email or password, Please try again', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getAllUser() {
    const users = await this.authModel.find().exec();
    return users;
  }
}
