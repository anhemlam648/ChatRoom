import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from '../entity/user.entity';
import { Room } from '../entity/room.entity';
import { Message } from '../entity/message.entity';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
