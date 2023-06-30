import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let service: AuthService;
  let controller: AuthController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[HttpModule],
      providers: [JwtService,{
        provide: AuthService,
        useValue: {
          login: jest.fn(),
          register: jest.fn(),
        },
      }
],
      controllers:[AuthController]
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });


    it('should signup a new user', async () => {

      const result = {
        success: true,
        message: "Account created succesfully",
        user: {
            _id: "64979456edc53fe97a2908a8",
            username: "josiahh",
            email: "jo@gmail.com"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDk3OTQ1NmVkYzUzZmU5N2EyOTA4YTgiLCJ1c2VybmFtZSI6Impvc2lhaGgiLCJlbWFpbCI6ImpvQGdtYWlsLmNvbSIsImlhdCI6MTY4NzY1NTUxMSwiZXhwIjoxNjg3NjU5MTExfQ.yVMDBv9Q2kKwlAY8NtLgL4rZepRBseHBG-7s4tS7irk"
      };

      const signUpDto = {
        username:"josiah",
        email:"joj@gmail.com",
        password:"secret123"
      };
      jest.spyOn(service, 'register').mockImplementation(async() => result);

      expect(await controller.signup(signUpDto)).toBe(result);
    });

    it('should login a user', async () => {

      const result = {
        success: true,
        message: "Account logged in succesfully",
        user: {
            _id: "648a0bffe1990ac0fabec60f",
            username: "josiah",
            email: "jojo@gmail.com",
            password: "$2b$10$Vj6SKvXd3hsEhs1sj16CHOiweY7/BMndomJV0Xqhyhsk2ReQ5o8Yq",
            __v: 0
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhhMGJmZmUxOTkwYWMwZmFiZWM2MGYiLCJ1c2VybmFtZSI6Impvc2lhaCIsImVtYWlsIjoiam9qb0Bnb"
      };

      const loginDto = {
        "email":"jojo@gmail.com",
        "password":"secret123"
      };
      jest.spyOn(service, 'login').mockImplementation(async() => result);

      expect(await controller.login(loginDto)).toBe(result);
    });

});
