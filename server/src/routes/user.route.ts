import { NextFunction, Request, Response } from 'express';
const { Router } = require('express');
const routes = Router();
import * as userCntrl from '../controllers/user.controller';

routes.post('/create', userCntrl.createUser);
routes.post('/login', userCntrl.loginUser);

export = routes;