/**
 * Express router for notification routes.
 * @module notifyRouter
 */

import express from 'express';
import { controller } from '../../controller/index.js';

const router = new express.Router();

router.post('/notify', controller.notifyController.sendNotification);

export const notifyRouter = router;
