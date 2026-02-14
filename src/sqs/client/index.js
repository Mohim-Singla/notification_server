// sqsClient.js
import { SQSClient } from '@aws-sdk/client-sqs';

let sqsClientInstanceMap = new Map();

export const sqsClient = {
  getInstance: (region) => {
    if (!region) {
      region = process.env.AWS_SQS_REGION_DEFAULT;
    }

    const instance = sqsClientInstanceMap.get(region) ?? new SQSClient({ region });
    sqsClientInstanceMap.set(region, instance);

    return instance;
  },
};
