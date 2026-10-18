const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const waitingQueue = [];
const matchTimeouts = new Map(); // Keep track of timeouts for bots

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('find_match', () => {
    console.log(`User ${socket.id} looking for a match`);
    
    // Add to waiting queue
    waitingQueue.push(socket);

    // Check if we have 2 players waiting
    if (waitingQueue.length >= 2) {
      // Pop the first two players
      const player1 = waitingQueue.shift();
      const player2 = waitingQueue.shift();
      
      // Clear their bot timeouts if they had any
      clearTimeout(matchTimeouts.get(player1.id));
      clearTimeout(matchTimeouts.get(player2.id));
      matchTimeouts.delete(player1.id);
      matchTimeouts.delete(player2.id);

      const roomId = `room-${crypto.randomUUID()}`;
      
      player1.join(roomId);
      player2.join(roomId);

      // Notify both players that a match is found
      io.to(roomId).emit('match_found', {
        roomId,
        opponentType: 'human',
        players: [player1.id, player2.id],
        message: 'Human opponent found!'
      });
      
      console.log(`Match created: ${roomId} with ${player1.id} and ${player2.id}`);
    } else {
      // If no match found immediately, set a timeout to match with a bot
      const timeoutId = setTimeout(() => {
        // Check if user is still in queue
        const index = waitingQueue.findIndex((s) => s.id === socket.id);
        if (index !== -1) {
          // Remove from queue
          waitingQueue.splice(index, 1);
          
          const roomId = `room-bot-${crypto.randomUUID()}`;
          socket.join(roomId);
          
          socket.emit('match_found', {
            roomId,
            opponentType: 'bot',
            players: [socket.id, 'AI_BOT'],
            message: 'No human players available. Matched with AI Bot!'
          });
          
          console.log(`Bot match created: ${roomId} for ${socket.id}`);

          // Simulate bot progress
          let botProgress = 0;
          const botInterval = setInterval(() => {
            // Randomly increase bot progress by 5-15%
            botProgress += Math.floor(Math.random() * 10) + 5;
            if (botProgress >= 100) {
              botProgress = 100;
              clearInterval(botInterval);
            }
            
            // Emit bot progress to the user
            io.to(roomId).emit('opponent_progress', {
              playerId: 'AI_BOT',
              progress: botProgress
            });
            
          }, 3000); // Update bot progress every 3 seconds
          
          // Clear interval when player disconnects
          socket.on('disconnect', () => {
            clearInterval(botInterval);
          });
        }
      }, 5000); // 5 seconds wait time for human
      
      matchTimeouts.set(socket.id, timeoutId);
    }
  });

  // Example of handling game progress (code submissions, progress updates)
  socket.on('update_progress', (data) => {
    // data = { roomId, progress }
    // Broadcast progress to the opponent in the same room
    socket.to(data.roomId).emit('opponent_progress', {
      playerId: socket.id,
      progress: data.progress
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove from waiting queue if they are in it
    const index = waitingQueue.findIndex((s) => s.id === socket.id);
    if (index !== -1) {
      waitingQueue.splice(index, 1);
    }
    // Clear timeout if they leave while waiting
    if (matchTimeouts.has(socket.id)) {
      clearTimeout(matchTimeouts.get(socket.id));
      matchTimeouts.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Coding Royale Backend Engine running on port ${PORT}`);
});
