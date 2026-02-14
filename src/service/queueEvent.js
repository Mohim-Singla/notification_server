import { sqsProducer } from '../sqs/producer/index.js';

export const queueEventService = {
  saveEvent: async (emailData) => {
    await sqsProducer.sendMessage(emailData);
    return { success: true };
  },
};
