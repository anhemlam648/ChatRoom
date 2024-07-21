import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
// import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
  
  //check method getHomePage
  it('should send the homePage.html file', () => {
    const res = {
      sendFile: jest.fn()
    } as unknown as Response;

    appController.getHomePage(res);

    expect(res.sendFile).toHaveBeenCalledWith(join(__dirname, '..', 'public', 'homePage.html'));
  });

   //check method getChatRoom
  it('should send the chatRoom.html file', () => {
    const res = {
      sendFile: jest.fn()
    } as unknown as Response;

    appController.getChatRoom(res);

    expect(res.sendFile).toHaveBeenCalledWith(join(__dirname, '..', 'public', 'chatRoom.html'));
  });

  
});
