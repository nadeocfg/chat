import dotenv from 'dotenv';
import colors from 'colors';
import express from 'express';
import { createServer, Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

dotenv.config();

const port = process.env.PORT || 5000;
const mode = process.env.APP_MODE || 'dev';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server: server });

wss.on('connection', (ws: WebSocket) => {
  ws.send('Welcome');
  console.log('new user connected');

  ws.on('message', (msg: BufferSource) => {
    console.log();
    console.log('received: %s', msg);

    wss.clients.forEach((ws) => {
      ws.send(new TextDecoder('utf-8').decode(msg));
    });
  });
});

server.listen(port, () => {
  console.log(
    colors.cyan.underline(`Server running in ${mode} mode, on port ${port}`)
  );
});
