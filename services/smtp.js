const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = sgMail;

// const nodemailer = require('nodemailer');
//
// const transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "characterdao.test@gmail.com",
//         pass: "characterdao723"
//     }
// });
//
// module.exports = transport;