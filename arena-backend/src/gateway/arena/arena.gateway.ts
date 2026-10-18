import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket, 
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ArenaGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private waitingQueue: { socket: Socket, mode: string }[] = [];

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.waitingQueue = this.waitingQueue.filter(p => p.socket.id !== client.id);
  }

  @SubscribeMessage('find_match')
  handleFindMatch(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const mode = data?.mode || 'General';
    console.log(`User ${client.id} looking for a match in mode: ${mode}`);

    // Very basic matchmaking for Phase 1 (First-Come-First-Serve per mode)
    const opponentIndex = this.waitingQueue.findIndex(p => p.mode === mode && p.socket.id !== client.id);

    if (opponentIndex !== -1) {
      const opponent = this.waitingQueue.splice(opponentIndex, 1)[0];
      const roomId = `room-${mode}-${Date.now()}`;
      
      client.join(roomId);
      opponent.socket.join(roomId);

      this.server.to(roomId).emit('match_found', {
        roomId,
        modeName: mode,
        opponentType: 'human',
        players: [client.id, opponent.socket.id],
        message: 'Human opponent found!'
      });
      
      console.log(`Match created: ${roomId}`);
    } else {
      this.waitingQueue.push({ socket: client, mode });
      
      // Setup a bot match fallback (mock for now)
      setTimeout(() => {
        const stillWaiting = this.waitingQueue.findIndex(p => p.socket.id === client.id);
        if (stillWaiting !== -1) {
          this.waitingQueue.splice(stillWaiting, 1);
          
          const roomId = `room-bot-${mode}-${Date.now()}`;
          client.join(roomId);
          
          client.emit('match_found', {
            roomId,
            modeName: mode,
            opponentType: 'bot',
            players: [client.id, 'AI_BOT'],
            message: 'Matched with AI Bot!'
          });
        }
      }, 5000);
    }
  }

  @SubscribeMessage('update_progress')
  handleUpdateProgress(
    @MessageBody() data: { roomId: string, progress: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.roomId).emit('opponent_progress', {
      playerId: client.id,
      progress: data.progress
    });
  }
}
