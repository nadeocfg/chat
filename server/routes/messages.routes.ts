import express from 'express';
import { postMessage } from '../controllers/messages.controller';

const messagesRoutes = express.Router();

messagesRoutes.route('/post').post(postMessage);

export default messagesRoutes;
