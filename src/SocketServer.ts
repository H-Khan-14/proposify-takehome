import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

const notes: { [id: string]: string } = {};

const startSocketServer = (httpServer: HttpServer | HttpsServer) => {
  const io: SocketServer = new SocketServer(httpServer, {
    cors: { origin: '*' },
  });

  const onConnection = async (socket: Socket) => {
    // Socket connection started
    console.log('Connection started with socket id: ' + socket.id);

    socket.on('updateNote', ({ id, content }) => {
      notes[id] = content; // Save updated note to in-memory store
      socket.broadcast.emit('noteUpdated', { id, content }); // Notify other clients
    });
    socket.on('disconnect', () => {
      console.log('Socket disconnected: ' + socket.id);
    });
  };

  io.on('connection', onConnection);
};

export default startSocketServer;
