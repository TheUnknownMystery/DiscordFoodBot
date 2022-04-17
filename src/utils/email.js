const nodemailer = require('nodemailer');

const createMailOptions = (subject, title, text) => ({
  from: process.env.ADMIN_EMAIL,
  to: process.env.ADMIN_EMAIL,
  subject,
  text,
  html: `
  <h1>${title}</h1>
  <h3>${text}</h3>
  `,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

module.exports = {
  createMailOptions,
  transporter,
};
