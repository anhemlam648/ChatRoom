import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entity/message.entity';
import { NotificationService } from '../notificationService/notification.service';
import { User } from '../../entity/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(id: number): Promise<Message | undefined> {
    return this.messageRepository.findOne({ where: { id } });
  }

  async create(message: Partial<Message>): Promise<Message> {
    const newMessage = this.messageRepository.create(message);
    const savedMessage = await this.messageRepository.save(newMessage);

    // create notification send user
    if (message.receiverId) {
      const receiver = await this.userRepository.findOne({ where: { id: message.receiverId } });
      if (receiver) {
        await this.notificationService.createNotification(receiver.id, `New message: ${message.content}`);
      }
    }

    return savedMessage;
  }

  async update(id: number, message: Partial<Message>): Promise<Message | undefined> {
    await this.messageRepository.update(id, message);
    return this.messageRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
