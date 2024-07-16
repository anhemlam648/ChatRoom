import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoomService } from '../roomService/room.service';
import { Room } from '../../entity/room.entity';

@Controller('/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Room | undefined> {
    return this.roomService.findOne(+id);
  }

  @Post('/add')
  create(@Body() room: Partial<Room>): Promise<Room> {
    return this.roomService.create(room);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() room: Partial<Room>): Promise<Room | undefined> {
    return this.roomService.update(+id, room);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.roomService.remove(+id);
  }
}