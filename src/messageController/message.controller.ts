import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MessageService } from '../messageService/message.service';
import { Message } from '../../entity/message.entity';

@Controller('/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Message | undefined> {
    return this.messageService.findOne(+id);
  }

  @Post('/add')
  create(@Body() message: Partial<Message>): Promise<Message> {
    return this.messageService.create(message);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() message: Partial<Message>): Promise<Message | undefined> {
    return this.messageService.update(+id, message);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.messageService.remove(+id);
  }
}
