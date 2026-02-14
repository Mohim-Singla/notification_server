import { utils } from '../../utils/index.js';

const config = {
  [utils.constant.ENVS.LOCAL]: {
    REGION: process.env.AWS_SQS_REGION_DEFAULT,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    QUEUE_LIST: 'notify_events',
  },
  [utils.constant.ENVS.DEV]: {
    REGION: process.env.AWS_SQS_REGION_DEFAULT,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    QUEUE_LIST: 'notify_events',
  },
  [utils.constant.ENVS.PROD]: {
    REGION: process.env.AWS_SQS_REGION_DEFAULT,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    QUEUE_LIST: 'notify_events',
  },
};

export const sqsClientConfig = config[process.env.ENV];
