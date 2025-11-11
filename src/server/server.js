const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables FIRST
dotenv.config();

console.log('Resend API Key:', process.env.RESEND_API_KEY ? 'Loaded' : 'Missing');

// Import the sendEmailRoute
const sendEmailRoute = require('./api/send-email');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', sendEmailRoute);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    resendKey: process.env.RESEND_API_KEY ? 'Loaded' : 'Missing'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Resend API Key: ${process.env.RESEND_API_KEY ? 'Loaded' : 'Missing'}`);
});