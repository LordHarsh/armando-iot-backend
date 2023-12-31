import { NextFunction, Request, Response } from 'express';
import { handleLoginUser } from './auth.service';
import { handleCreateUser } from './auth.service';
import { CONSTANTS } from '../../shared/constants';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleCreateUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password);
    res.status(CONSTANTS.USER_CREATED_SUCCESSFULLY.code).send({
      success: CONSTANTS.USER_CREATED_SUCCESSFULLY.success,
      message: CONSTANTS.USER_CREATED_SUCCESSFULLY.message.msg,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userObj = { email: req.body.email, password: req.body.password };
    const token = await handleLoginUser(userObj.email, userObj.password);
    res.status(CONSTANTS.USER_LOGGED_IN_SUCCESSFULLY.code).json({
      success: CONSTANTS.USER_LOGGED_IN_SUCCESSFULLY.message.success,
      message: CONSTANTS.USER_LOGGED_IN_SUCCESSFULLY.message.description,
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
};
