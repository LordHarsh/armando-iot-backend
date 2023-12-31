import { Router } from 'express';
import { changeSettings, changeOneSetting } from './device.controller';

export default (): Router => {
    const app = Router();
    app.post('/change', changeSettings);
    app.post('/changeone', changeOneSetting);
    return app;
}