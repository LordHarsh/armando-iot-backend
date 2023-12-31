import { NextFunction, Request, Response } from 'express';
import { handleAnswer, handleCreateChat, handleGetChat } from './chat.service';

export const answerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const answer = await handleAnswer(req.body.email, req.body.prompt);
    res.status(200).send({
      success: true,
      message: 'Got Answer!',
      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

export const createChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleCreateChat(req.body.email);
    res.status(200).send({
      success: true,
      message: 'Created Chat!',
    });
  } catch (error) {
    next(error);
  }
};

export const getChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const conversation = await handleGetChat(req.body.email);
    res.status(200).send({
      success: true,
      message: 'Got Chat!',
      chat: conversation,
    });
  } catch (error) {
    next(error);
  }
};
