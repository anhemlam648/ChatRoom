import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../entity/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find();
  }

  async findOne(id: number): Promise<Room | undefined> {
    return await this.roomRepository.findOne(id);
  }

  async create(room: Partial<Room>): Promise<Room> {
    const newRoom = await this.roomRepository.create(room);
    return await this.roomRepository.save(newRoom);
  }

  async update(id: number, updateRoom: Partial<Room>): Promise<Room | undefined> {
    await this.roomRepository.update(id, updateRoom);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}