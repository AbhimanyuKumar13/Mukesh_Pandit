const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // THIS CONFIG BYPASSES RENDER'S SMTP BLOCK 100%
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,                    // MUST be false for port 587
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,   // 16-char App Password (with space is OK)
    },
    tls: {
      rejectUnauthorized: false      // This line is the magic on Render
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,  // Clean sender
    to: process.env.EMAIL_USER,
    replyTo: email,                   // So you can reply directly to visitor
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully via Gmail");
    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Gmail send failed:", error.message || error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

module.exports = router;