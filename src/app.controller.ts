import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   res.sendFile(join(__dirname, '..', 'public', './public/index.html'));
  // }
  @Get('homePage')
  getHomePage(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'public', 'homePage.html'));
  }
  
  @Get('chatRoom')
  getHello(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'public', 'chatRoom.html'));
  }
  @Get('login')
  getLoginPage(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'public', 'login.html'));
  }

}
