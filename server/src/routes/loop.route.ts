import { NextFunction, Request, Response } from 'express';
const { Router } = require('express');
const routes = Router();
import * as loopCntrl from '../controllers/loop.controller';

const reuse = require("../utils/reusable");

routes.post('/create', reuse.validateParameters(['loop_title', 'frequency', 'start_date', 'visibility']), loopCntrl.createLoop);
routes.get('/me', loopCntrl.getUserLoops);
routes.post('/check-in', loopCntrl.checkIn);
routes.get('/public', loopCntrl.getPublicLoops);
routes.post('/clone', loopCntrl.cloneLoop);
routes.get('/personal-feed', loopCntrl.getPersonalFeed);

export = routes;