import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '../client/index.js';

/**
 * SQS Producer module for sending messages to SQS queues.
 * @param {object} messageBody
 * @returns {Promise<{messageId: string}>}
 */
async function sendMessage(messageBody) {
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: sqsClient.getQueueUrl('notify_events'),
  };

  try {
    const command = new SendMessageCommand(params);
    const data = await sqsClient.getInstance('ap-south-1').send(command);
    return { messageId: data.MessageId };
  } catch (err) {
    console.error('Error sending message:', err);
    throw err;
  }
}

/**
 * SQS Producer module for sending messages to SQS queues.
 */
export const sqsProducer = {
  sendMessage,
};
