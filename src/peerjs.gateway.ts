import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway(80, { namespace: 'chat' })
@WebSocketGateway({ namespace: '/peerjs' })
export class VideoGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('Peerjs');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
    client.to(room).emit('user-connected', room);
  }
}
