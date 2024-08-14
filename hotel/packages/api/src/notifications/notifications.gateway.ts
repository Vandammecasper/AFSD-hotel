import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Room } from 'src/rooms/entities/room.entity';
import { FirebaseWebsocketGuard } from 'src/authentication/guards/firebase.websocket.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway(3004, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8081',
    ],
    credentials: true,
  },
})
export class NotificationsGateway
// implements OnGatewayConnection, OnGatewayDisconnect
{
  
  afterInit(server: Server) {
    console.log('WebSocket server initialized on port 3004');
  }

  @WebSocketServer() // An alternative for afterInit()
  server: Server

  @UseGuards(FirebaseWebsocketGuard)
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  // Send notification to hairdressers if a new lockChange is made
  async sendNewLockChange(lockChange: Room):Promise<Room>{
    this.server.emit('newLockChange', lockChange);
    return lockChange;
  }
}
