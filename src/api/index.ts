import { Router } from 'express';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import chatRouter from './chat/chat.router';
import deviceRouter from './device/device.router';

export default (): Router => {
  const app = Router();
  app.use('/user', userRouter())
  app.use('/auth',authRouter())
  app.use('/chat', chatRouter())
  app.use('/device', deviceRouter())  
  return app;
};
