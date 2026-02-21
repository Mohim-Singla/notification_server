import { sqsProducer } from '../sqs/producer/index.js';

/**
 * Service for handling queue events.
 * @module queueEventService
 */
export const queueEventService = {
  /**
   * Saves an event to the queue.
   * @param {object} emailData - Data for the email event.
   * @returns {Promise<{success: boolean}>} Result of the save operation.
   */
  saveEvent: async (emailData) => {
    await sqsProducer.sendMessage(emailData);
    return { success: true };
  },
};
