// sqsClient.js
import { SQSClient } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';
import { sqsClientConfig } from '../../config/sqs/sqsClientConfig.js';

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
  getQueueUrl: (queueName) => {
    return `https://sqs.${sqsClientConfig.REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${queueName}`;
  },
  initConsumer: () => {
    const queueNames = sqsClientConfig.QUEUE_LIST.split(',').map((name) => name.trim());

    for (const queueName of queueNames) {
      const queueUrl = sqsClient.getQueueUrl(queueName);
      // const queueUrl = 'https://sqs.ap-south-1.amazonaws.com/498968923556/notify_events';
      let consumer = null;

      switch (queueName) {
      case 'notify_events':
        consumer = Consumer.create({
          queueUrl: queueUrl,
          region: process.env.AWS_SQS_REGION_DEFAULT,
          handleMessage: async (message) => {
            try {
              let event = JSON.parse(message.Body);
              console.log('Received event:', event);
            } catch (error) {
              console.error('Error processing message:', error);
            }
          },
        });
        break;
      default:
        continue;
      }
      consumer.start();
    }
  },
};
