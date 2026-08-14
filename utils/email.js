const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Создать средство доставки
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Определить основные параметры email
  const mailOptions = {
    from: 'Artem <hello@artem.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // HTML
  };
  // 3. ОТправить письмо с помощью email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

/* 
ЕСЛИ GMAIL
Активировать в gmail опцию "менее безопасное приложение"

const sendEmail = (options) => {
  // 1. Создать средство доставки
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

*/
