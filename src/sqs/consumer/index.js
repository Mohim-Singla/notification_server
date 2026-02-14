import { Consumer } from 'sqs-consumer';
import dotenv from 'dotenv';

dotenv.config();

const queueUrl = 'https://sqs.ap-south-1.amazonaws.com/498968923556/notify_events';

let consumer = Consumer.create({
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

consumer.start();
