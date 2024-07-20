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

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(id: number): Promise<Message | undefined> {
    return this.messageRepository.findOneBy({ id });
  }

  create(message: Partial<Message>): Promise<Message> {
    const newMessage = this.messageRepository.create(message);
    return this.messageRepository.save(newMessage);
  }

  async update(id: number, message: Partial<Message>): Promise<Message | undefined> {
    await this.messageRepository.update(id, message);
    return this.messageRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
