const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Use Ethereal for local testing to avoid ISP port blocking
  const testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const message = {
    from: `${process.env.FROM_NAME || 'CareerTest'} <${process.env.FROM_EMAIL || process.env.SMTP_EMAIL || 'noreply@careertest.com'}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
    text: options.message // fallback
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Email could not be sent', error);
    throw error; // Crucial so the controller knows to handle the error
  }
};

module.exports = sendEmail;
