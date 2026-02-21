import { service } from '../service/index.js';
import { utils } from '../utils/index.js';

export const sqsConsumerController = {
  consumeMessage: async (sqsMessage) => {
    let messageId = '';
    try {
      messageId = sqsMessage.MessageId || 'UnknownMessageId';
      const messageBody = utils.common.parseJSON(sqsMessage.Body);
      console.log('Received message:', messageBody);
      const shouldSendEmail = messageBody?.channel?.includes('email');
      if (shouldSendEmail) {
        const response = await service.emailService.sendEmail(messageBody.data);
        if (!response.success) {
          throw new Error(`Failed to send email: ${response.error}`);
        }
        console.log('Email sent successfully for message:', messageBody);
      }
      console.log('Message processing completed for message Id:', messageId);
      return true;
    } catch (error) {
      console.error('Error consuming message with message Id:', messageId, error);
      // Return true since DLQ is not configured
      return true;
    }
  },
};
