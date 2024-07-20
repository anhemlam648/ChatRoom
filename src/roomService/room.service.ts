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

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: number): Promise<Room | undefined> {
    return this.roomRepository.findOneBy({ id });
  }

  create(room: Partial<Room>): Promise<Room> {
    const newRoom = this.roomRepository.create(room);
    return this.roomRepository.save(newRoom);
  }

  async update(id: number, room: Partial<Room>): Promise<Room | undefined> {
    await this.roomRepository.update(id, room);
    return this.roomRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
