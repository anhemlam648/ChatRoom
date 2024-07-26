import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from '../entity/user.entity';
import { Room } from '../entity/room.entity';
import { Message } from '../entity/message.entity';
import { UserController } from '../src/userController/user.controller';
import { RoomController } from '../src/roomController/room.controller';
import { MessageController } from '../src/messageController/message.controller';
import { UserService } from '../src/userService/user.service';
import { RoomService } from '../src/roomService/room.service';
import { MessageService } from '../src/messageService/message.service';
import { ChatGateway } from '../src/gateway/chat.gateway';
import { NotificationController } from '../src/notificationController/notification.controller';
import { NotificationService } from './notificationService/notification.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_chat_app',
      entities: [User, Room, Message],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Room, Message]),
  ],
  controllers: [AppController,UserController,RoomController,MessageController,NotificationController],
  providers: [AppService,UserService,RoomService,MessageService,ChatGateway,NotificationService],
})
export class AppModule {}
