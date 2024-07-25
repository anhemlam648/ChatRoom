import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { NotificationService } from '../notificationService/notification.service';
import { Notification } from '../../entity/notification.entity';

@Controller('/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/create')
  createNotification(@Body('userId') userId: number, @Body('message') message: string): Promise<Notification> {
    return this.notificationService.createNotification(userId, message);
  }

  @Get('/user/:userId')
  getNotifications(@Param('userId') userId: number): Promise<Notification[]> {
    return this.notificationService.getNotifications(userId);
  }

  @Patch('/read/:id')
  markAsRead(@Param('id') id: number): Promise<Notification> {
    return this.notificationService.markAsRead(id);
  }
}
