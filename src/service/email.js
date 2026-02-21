import { sendgrid } from '../integrations/sendgrid/index.js';
// const sgMail = await import('../integrations/sendgrid/index.js').then(module => module.sendgrid.getInstance());

export const emailService = {
  /**
   * Sends an email using SendGrid.
   * @param {object} params - Email parameters.
   * @param {string} params.to - Recipient email address.
   * @param {string} params.subject - Email subject.
   * @param {string} params.text - Plain text body.
   * @param {string} params.html - HTML body.
   * @returns {Promise<{success: boolean, error?: string}>} Result of the email send operation.
   */
  sendEmail: async (params) => {
    try {
      const sgMail = await sendgrid.getInstance();
      const msg = {
        to: params.to,
        from: process.env.SENDGRID_VERIFIED_SENDER_EMAIL,
        subject: params.subject,
        text: params.text,
        html: params.html,
      };
      await sgMail.send(msg);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  },
};
