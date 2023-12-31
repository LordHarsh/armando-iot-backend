import { NextFunction, Request, Response } from 'express';
import { handleDeleteUser, handleGetUser, handleGetUsers, handleUpdateUser } from './user.service';
import { CONSTANTS } from '../../shared/constants';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await handleGetUser(res.locals.user.email);
    res.status(CONSTANTS.USER_FETCHED_SUCCESSFULLY.code).send({
      success: CONSTANTS.USER_FETCHED_SUCCESSFULLY.message.success,
      message: CONSTANTS.USER_FETCHED_SUCCESSFULLY.message.description,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleDeleteUser(req.params.email);
    res.status(CONSTANTS.USER_DELETED_SUCCESSFULLY.code).json({
      success: CONSTANTS.USER_DELETED_SUCCESSFULLY.success,
      message: CONSTANTS.USER_DELETED_SUCCESSFULLY.message.msg,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await handleGetUsers();
    res.status(CONSTANTS.USERS_FETCHED_SUCCESSFULLY.code).send({
      success: CONSTANTS.USERS_FETCHED_SUCCESSFULLY.message.success,
      message: CONSTANTS.USERS_FETCHED_SUCCESSFULLY.message.description,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleUpdateUser(req.file, req.body);
    res.status(200).send({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
