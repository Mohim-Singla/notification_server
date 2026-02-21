import { sendgrid } from '../integrations/sendgrid/index.js';
// const sgMail = await import('../integrations/sendgrid/index.js').then(module => module.sendgrid.getInstance());

export const emailService = {
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
      console.log('msg-----', msg);
      await sgMail.send(msg);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  },
};
