/**
 * Express router for notification routes.
 * @module notifyRouter
 */

import express from 'express';
import { controller } from '../../controller/index.js';
import { JoiSchemas } from '../../apiValidations/index.js';
import { validateRequest } from '../../middleware/requestValidator.js';

const router = new express.Router();

router.post('/notify', validateRequest(JoiSchemas.notify), controller.notifyController.sendNotification);

export const notifyRouter = router;
