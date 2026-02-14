/**
 * Express router for notification routes.
 * @module notifyRouter
 */

import express from 'express';
import { notifyController } from '../../controller/notifyController.js';

const router = new express.Router();

router.post('/notify', notifyController.sendNotification);

export const notifyRouter = router;
