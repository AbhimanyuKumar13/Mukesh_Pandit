// routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER; // where to send contact mails

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn('Email credentials not set. Set EMAIL_USER and EMAIL_PASS as env vars.');
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // set true if you want cert validation
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  });
};

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required.' });

  const transporter = createTransporter();

  // Optional: verify connection quickly
  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error('SMTP verify failed:', verifyErr && (verifyErr.message || verifyErr));
    return res.status(500).json({ message: 'Email service not available. Try again later.' });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: EMAIL_TO,
    subject: `New Contact Form: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info && (info.messageId || info.response));
    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    // log detailed error for debugging
    console.error('Email send error:', err && (err.response || err.message || err));
    // classify common errors for user-friendly messages
    if (err && err.code === 'ECONNECTION') {
      return res.status(502).json({ message: 'Unable to connect to email server (connection error).' });
    }
    if (err && err.code === 'ETIMEDOUT') {
      return res.status(504).json({ message: 'Email send timed out.' });
    }
    return res.status(500).json({ message: 'Failed to send message.' });
  }
});

module.exports = router;
