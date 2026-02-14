import { utils } from '../../utils/index.js';

const config = {
  [utils.constant.ENVS.LOCAL]: {
    REGION: process.env.AWS_SQS_REGION_DEFAULT,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
  [utils.constant.ENVS.DEV]: {
    REGION: process.env.AWS_SQS_REGION_DEFAULT,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
  [utils.constant.ENVS.PROD]: {
    REGION: process.env.AWS_SQS_REGION_DEFAULT,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export const sqsClientConfig = config[process.env.ENV];
