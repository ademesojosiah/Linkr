import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Auth } from './schema/auth.schema';
import { signUpDto } from './dto/signUp.dto';
import { loginResponse } from './interface/loginResonse.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice:AuthService
    ){}

    @Post('signup')
    async signup(@Body() body:signUpDto):Promise<loginResponse>{
        return await this.authservice.register(body)
    }

    @Get('get')
    async get(){
        return await this.authservice.getAllUser()
    }


    @Post('login')
    async login(@Body() body:loginDto):Promise<loginResponse>{
        return await this.authservice.login(body)
    }


}
