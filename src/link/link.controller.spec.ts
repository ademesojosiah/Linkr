import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './link.controller';
import { HttpModule } from '@nestjs/axios';
import { LinkService } from './link.service';
import { JwtAuthGuard } from '.././auth/guard';
import * as httpMocks from 'node-mocks-http';
import { Auth } from '.././auth/schema/auth.schema';
import { Schema } from 'mongoose';





describe('AuthController', () => {
  let service: LinkService;
  let controller: LinkController;

  const mockRequest = httpMocks.createRequest<any>();
  mockRequest.user = {
    username:'jojo',
    userId:new Schema.Types.ObjectId('sjss')
   }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[HttpModule],
      providers: [{
        provide: LinkService, useValue: {
          create:jest.fn(),
          getLink:jest.fn(),
          getAllLinks:jest.fn(),
          getLinkById:jest.fn(),
          deleteLink:jest.fn()
         },   
      },
      {provide:JwtAuthGuard,useValue:jest.fn().mockImplementation(()=>true)}
],
      controllers:[LinkController]
    }).compile();

    service = module.get<LinkService>(LinkService);
    controller = module.get<LinkController>(LinkController);
  });


    it('should create a link', async () => {

      const result ={
        success: true,
        link: {
            originalLink: "http://www.gmail.com",
            shortLink: "http://localhost:3333/hello",
            userId: new Schema.Types.ObjectId('sjss'),
            clicks: 0,
            _id: new Schema.Types.ObjectId('sjss'),
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        }
    };
      const body = {
        originalLink:"http://www.gmail.com",
        customLink:"hello" //optional
    }
      jest.spyOn(service, 'create').mockImplementation(async() => result);

      expect(await controller.createLink(body,mockRequest)).toBe(result);
    });


});
