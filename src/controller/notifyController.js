import { service } from '../service/index.js';

/**
 * Controller for handling notifications.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 */
const sendNotification = async (req, res) => {
  let response = { success: false };
  try {
    const { channel, template_id, data, meta } = req.body;
    response = await service.queueEventService.saveEvent({ channel, template_id, data, meta });
    if (!response.success) {
      throw new Error('Failed to save email event.');
    }
    return res.success('Notification event saved successfully.', response);
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.error('Failed to send notification.', response);
  }
};

export const notifyController = { sendNotification };
