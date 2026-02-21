import sgMail from '@sendgrid/mail';

let sendgridInstance = null;

export const sendgrid = {
  /**
   * Initializes SendGrid with API key.
   * @returns {Promise<sgMail>} The SendGrid instance.
   */
  init: async () => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sendgridInstance = sgMail;
    return sendgridInstance;
  },
  /**
   * Gets the SendGrid instance.
   * @returns {sgMail} The SendGrid instance.
   */
  getInstance: () => sendgridInstance ?? sendgrid.init(),
};
