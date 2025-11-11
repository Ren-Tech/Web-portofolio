const express = require('express');
const { Resend } = require('resend');

const router = express.Router();

// Check if API key exists
if (!process.env.RESEND_API_KEY) {
  console.error('ERROR: RESEND_API_KEY is missing from environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple HTML email template
const createEmailHtml = (name, email, message) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
      </head>
      <body>
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #8898aa; font-size: 12px;">
          This email was sent from your website's contact form.
        </p>
      </body>
    </html>
  `;
};

router.post('/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Received contact form submission:', { name, email, message });

    // If no API key, return a simulation response for testing
    if (!process.env.RESEND_API_KEY) {
      console.log('Simulating email send (no API key)');
      return res.status(200).json({ 
        success: true, 
        simulation: true,
        message: 'Email would be sent with proper API key' 
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'clarence11soriano@gmail.com',
      subject: `New contact form submission from ${name}`,
      html: createEmailHtml(name, email, message),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true, data });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;