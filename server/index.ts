import dotenv from 'dotenv';
import colors from 'colors';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import messagesRoutes from './routes/messages.routes';

dotenv.config();

const port = process.env.PORT || 5000;
const mode = process.env.APP_MODE || 'dev';

const app = express();

app.use('/api/messages/', messagesRoutes);

const server = createServer(app);
const wss = new WebSocketServer({ server: server });

wss.on('connection', (ws: WebSocket) => {
  console.log('new user connected');

  ws.on('message', (msg: string) => {
    const body = JSON.parse(msg);

    wss.clients.forEach((ws) => {
      ws.send(JSON.stringify(body));
    });
  });
});

server.listen(port, () => {
  console.log(
    colors.cyan.underline(`Server running in ${mode} mode, on port ${port}`)
  );
});
