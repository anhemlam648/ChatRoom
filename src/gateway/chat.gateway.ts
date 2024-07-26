import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../../src/messageService/message.service';
import { NotificationService } from '../notificationService/notification.service';
import { Message } from '../../entity/message.entity';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly notificationService: NotificationService,
  ) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: Partial<Message>,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const newMessage = await this.messageService.create(message);

    if (message.receiverId) {
      await this.notificationService.createNotification(message.receiverId, `New message from ${newMessage.user.username}: ${message.content}`);
    }

    this.server.to(message.room.id.toString()).emit('message', newMessage);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody('roomId') roomId: string, @ConnectedSocket() client: Socket): void {
    client.join(roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody('roomId') roomId: string, @ConnectedSocket() client: Socket): void {
    client.leave(roomId);
  }
}
