/**
 * Express router for API version 1.
 * @module v1
 */

import express from 'express';
import { notifyRouter } from './notify.js';

const router = new express.Router();

router.use('', notifyRouter);

export const v1 = router;
