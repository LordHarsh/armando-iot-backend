import { Router } from 'express';
import { answerController, createChat, getChat } from './chat.controller';
import authenticateToken from '../../shared/middlewares/authenticate';

export default (): Router => {
    const app = Router();
    app.post('/answer', answerController);
    app.post('/create', createChat);
    app.post('/', getChat);
    return app;
  };