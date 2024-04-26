const nodemailer = require('nodemailer');


//nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'actunity24@gmail.com',
      pass: 'kecc lkbk zeoz yncp',
    },
  });

  module.exports.transporter = transporter;