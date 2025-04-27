import { NextFunction, Request, Response } from 'express';
const { Router } = require('express');
const routes = Router();
import * as commonCntrl from '../controllers/common.controller';

routes.get('/connect-db', commonCntrl.connectDB);
routes.get('/ping', (request: Request , response: Response) => {
    response.json({success: true, message: "pong!"})
})

export = routes;