// sqsClient.js
import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';
import { sqsClientConfig } from '../../config/sqs/sqsClientConfig.js';
import { controller } from '../../controller/index.js';

let sqsClientInstanceMap = new Map();

/**
 * SQS Client module for managing AWS SQS interactions.
 * Provides methods to get SQS client instances, queue URLs, and initialize consumers.
 * @module sqsClient
 */
export const sqsClient = {
  /**
   * Gets an SQS client instance for the specified region.
   * @param {string} region - AWS region.
   * @returns {SQSClient} SQS client instance.
   */
  getInstance: (region) => {
    if (!region) {
      region = process.env.AWS_SQS_REGION_DEFAULT;
    }

    const instance = sqsClientInstanceMap.get(region) ?? new SQSClient({
      region,
      credentials: {
        accessKeyId: sqsClientConfig.ACCESS_KEY_ID,
        secretAccessKey: sqsClientConfig.SECRET_ACCESS_KEY,
      },
    });
    sqsClientInstanceMap.set(region, instance);

    return instance;
  },
  /**
   * Gets the queue URL for a given queue name.
   * @param {string} queueName - Name of the queue.
   * @returns {string} Queue URL.
   */
  getQueueUrl: (queueName) => {
    return `https://sqs.${sqsClientConfig.REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${queueName}`;
  },
  /**
   * Initializes SQS consumers for the configured queues.
   */
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
          sqs: sqsClient.getInstance(process.env.AWS_SQS_REGION_DEFAULT),
          handleMessage: async (message) => {
            try {
              const result = await controller.sqsConsumerController.consumeMessage(message);
              if (result) {
                const deleteCommand = new DeleteMessageCommand({
                  QueueUrl: queueUrl,
                  ReceiptHandle: message.ReceiptHandle,
                });
                await consumer.sqs.send(deleteCommand);
                console.log('Message acknowledged and deleted:', message.MessageId);
              }
            } catch (error) {
              console.error('Error processing message, not acknowledging:', message.MessageId, error);
              // Do not delete, let it retry or go to DLQ
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
