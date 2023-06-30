import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { HttpModule } from '@nestjs/axios';
import { LinkService } from './link.service';
import { JwtAuthGuard } from '../auth/guard';
import * as httpMocks from 'node-mocks-http';
import { Auth } from '../auth/schema/auth.schema';
import { Schema } from 'mongoose';





describe('AuthController', () => {
  let service: LinkService;
  let controller: AnalyticsController;

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
      controllers:[AnalyticsController]
    }).compile();

    service = module.get<LinkService>(LinkService);
    controller = module.get<AnalyticsController>(AnalyticsController);
  });


    it('should get  all links the user', async () => {

      const link = {
            originalLink: "http://www.gmail.com",
            shortLink: "http://localhost:3333/hello",
            userId: new Schema.Types.ObjectId('sjss'),
            clicks: 0,
            _id: new Schema.Types.ObjectId('sjss'),
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
      }

      const result ={
        success: true,
        link: [
          link,
          link
        ]
       };
      const body = {
        originalLink:"http://www.gmail.com",
        customLink:"hello" //optional
    }
      jest.spyOn(service, 'getAllLinks').mockImplementation(async() => result);

      expect(await controller.getLinks(mockRequest)).toBe(result);
    });


    it('should get link by Id', async () => {

      const link = {
            originalLink: "http://www.gmail.com",
            shortLink: "http://localhost:3333/hello",
            userId: new Schema.Types.ObjectId('sjss'),
            clicks: 0,
            _id: new Schema.Types.ObjectId('sjss'),
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
      }

      const result ={
        success: true,
        analytics: [
            {
                _id: new Schema.Types.ObjectId('sjss'),
                ip: "::1",
                referer: null,
                location: "isjdn",
                agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                linkId: new Schema.Types.ObjectId('sjss'),
                createdAt:new Date() ,
                updatedAt:new Date() ,
                __v: 0
            }
        ],
        link: {
            ...link
        },
        noClicks: 4
       };

      const body = {
        originalLink:"http://www.gmail.com",
        customLink:"hello" //optional
    }
      jest.spyOn(service, 'getLinkById').mockImplementation(async() => result);

      expect(await controller.getLinkById('sjss',mockRequest)).toBe(result);
    });



    it('should get link by Id', async () => {



      const result ={
        "success": true,
        "link": {
            "acknowledged": true,
            "deletedCount": 1
        }
    };

      const body = {
        originalLink:"http://www.gmail.com",
        customLink:"hello" //optional
    }
      jest.spyOn(service, 'deleteLink').mockImplementation(async() => result);

      expect(await controller.deleteLink('sjss',mockRequest)).toBe(result);
    });


});
