import { Router } from 'express';
import { deleteUser, getUser, getUsers, updateUser } from './user.controller';

import { upload } from '../../shared/utils/multer';
import authenticateToken from '../../shared/middlewares/authenticate';
import { validateRequest } from '../../shared/middlewares/validator';
import { userSchema } from './user.schema';

export default (): Router => {
  const app = Router();
  app.get('/users', getUsers);
  app.get('/user', authenticateToken(), getUser);
  app.delete('/delete', authenticateToken(), deleteUser);
  app.patch('/update', authenticateToken(), upload.single('avatar'), validateRequest('body', userSchema), updateUser);
  return app;
};
