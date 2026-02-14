import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '../client/index.js';

const queueURL = 'https://sqs.ap-south-1.amazonaws.com/498968923556/notify_events';

async function sendMessage(messageBody) {
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: queueURL,
  };

  try {
    const command = new SendMessageCommand(params);
    const data = await sqsClient.getInstance('ap-south-1').send(command);
    return { messageId: data.MessageId };
  } catch (err) {
    console.error('Error sending message:', err);
  }
}

export const sqsProducer = {
  sendMessage,
};
