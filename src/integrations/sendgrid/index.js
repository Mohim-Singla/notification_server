import sgMail from '@sendgrid/mail';

let sendgridInstance = null;

export const sendgrid = {
  init: async () => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sendgridInstance = sgMail;
    return sendgridInstance;
  },
  getInstance: () => sendgridInstance ?? sendgrid.init(),
};
