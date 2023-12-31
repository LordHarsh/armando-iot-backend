import { NextFunction, Request, Response } from 'express';
import { handleChangeSettings, handleChangeOneSetting } from './device.service';

export const changeSettings = async (req: Request, res: Response, next: NextFunction):  Promise<void> => {
    try {
        const new_settings = await handleChangeSettings(req.body.presentemail);
        res.status(200).send({
            success: true,
            message: "Settings Changed!",
            data: new_settings
        })
    } catch (error) {
        next(error)
    }
}

export const changeOneSetting = async (req: Request, res: Response, next: NextFunction):  Promise<void> => {
    try {
        const new_settings = await handleChangeOneSetting(req.body.name, req.body.setting);
        res.status(200).send({
            success: true,
            message: "Setting Changed!",
            data: new_settings
        })
    } catch (error) {
        next(error)
    }
}