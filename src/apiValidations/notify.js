import Joi from 'joi';
import { serviceConfig } from '../config/service/index.js';

/**
 * @typedef {Object} NotifySchema
 */
const notify = {
  body: Joi.object({
    channel: Joi.array().items(Joi.string()).required(),
    template_id: Joi.string().required().valid(...Object.keys(serviceConfig.TEMPLATE_MAP)),
    data: Joi.object({
      to: Joi.string().email().required(),
      user_id: Joi.string().optional().allow('', null),
      user_name: Joi.string().required(),
      subject: Joi.string().required(),
      text: Joi.string().optional().allow('', null),
      html: Joi.string().optional().allow('', null),
    }).required(),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    meta: Joi.object({
      retries: Joi.number().integer().min(0).default(3),
      ttl: Joi.number().integer().min(0).default(86400),
      source: Joi.string().default('unknown'),
    }).default({ retries: 3, ttl: 86400, source: 'unknown' }),
  }),
};

export const notifySchema = {
  notify,
};
