const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = {
  async sendConfirmationMail(user) {
    try {
      await transporter.sendMail({
        from: '"Leo from BugTracker 🐞" <leo@ti.bugtracker>',
        to: user.email,
        subject: 'Account Confirmation ✔',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
      });

      return true;
    } catch (error) {
      return error.message;
    }
  },
};
