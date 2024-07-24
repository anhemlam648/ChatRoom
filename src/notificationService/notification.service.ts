import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../src/notification/notification.entity';
import { User } from '../../entity/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createNotification(userId: number, message: string): Promise<Notification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const notification = this.notificationRepository.create({ message, user });
    return this.notificationRepository.save(notification);
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });
    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }
}
