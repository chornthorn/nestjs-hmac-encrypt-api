import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TopUpNotifyDto } from './dto/top-up.dto';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  // push data to specific client
  pushTopUpNotify(data: TopUpNotifyDto) {
    // convert data to json string
    const jsonData = JSON.stringify(data);
    this.server.emit(data.tran_id, jsonData);
    return {
      success: true,
      message: 'success',
      data: null,
    };
  }

  //  client listen server
  // client() {
  //   // let r = crypto.randomBytes(50).toString('hex');
  //   // console.log("random", r);
  //   throw new UnauthorizedException();
  //
  //   // Client
  //   // receive a message from the server
  //   const socket = io('ws://localhost:3000');
  //   socket.on('connect', () => {
  //     console.log('connection created.');
  //   });
  //   socket.on('LST-0000000047', (...args) => {
  //     console.log('Client received');
  //     console.log(args[0], Date());
  //   });
  //
  //   return {
  //     success: true,
  //     message: 'success',
  //     data: null,
  //   };
  // }
}
