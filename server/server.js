const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
 
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000', 
];
 
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/contact', contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0" ,() => console.log(`Server running on port ${PORT}`));
