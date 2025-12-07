const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Default origins if ALLOWED_ORIGINS not provided
const defaultOrigins = [
  'https://panditconstruction.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

// Read from env and convert to array (comma-separated)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
  : defaultOrigins;

console.log('CORS allowed origins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (eg. curl, mobile apps, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn('Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Optional: simple health endpoint to check service
app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/contact', contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
