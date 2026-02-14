export const emailService = {
  sendEmail: async (params) => {
    try {
      const sgMail = await import('../integrations/sendgrid/index.js').then(module => module.sendgrid.getInstance());
      const msg = {
        to: params.to,
        from: params.from ?? process.env.SENDGRID_VERIFIED_SENDER_EMAIL,
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
