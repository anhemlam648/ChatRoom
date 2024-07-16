import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entity/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message | undefined> {
    return await this.messageRepository.findOne(id);
  }

  async create(message: Partial<Message>): Promise<Message> {
    const newMessage = await this.messageRepository.create(message);
    return await this.messageRepository.save(newMessage);
  }

  async update(id: number, updateMessage: Partial<Message>): Promise<Message | undefined> {
    await this.messageRepository.update(id, updateMessage);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}