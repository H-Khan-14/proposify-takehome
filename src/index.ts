import express from 'express';
import cors from 'cors';
import { Server as HttpServer, createServer as createHttpServer } from 'http';
import startSocketServer from './SocketServer';
import notes from './routes/notes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', notes);

let httpServer: HttpServer;
httpServer = createHttpServer(app);

startSocketServer(httpServer);

httpServer.listen(3005, () => {
  console.info(`Listening on 3005`);
});
