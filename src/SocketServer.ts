import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

const notes: { [id: string]: string } = {};
const users: { [socketId: string]: string } = {};

const startSocketServer = (httpServer: HttpServer | HttpsServer) => {
  const io: SocketServer = new SocketServer(httpServer, {
    cors: { origin: '*' },
  });

  const onConnection = async (socket: Socket) => {
    // Socket connection started
    console.log('Connection started with socket id: ' + socket.id);

    socket.on('updateNote', ({ id, content, socketId }) => {
      notes[id] = content; // Save updated note to in-memory store
      // Broadcast to all clients including sender, but with sender's socketId
      io.emit('noteUpdated', { id, content, socketId });
    });

    socket.on('login', (username) => {
      users[socket.id] = username;
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected: ' + socket.id);
      delete users[socket.id];
    });
  };

  io.on('connection', onConnection);
};

export default startSocketServer;
