// TODO: Email Integration for Contact Form
// This file will contain the email sending functionality for the contact form

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  project?: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Popular email service options:
// 1. EmailJS (client-side, easy setup)
// 2. Formspree (form backend service)
// 3. SendGrid (professional email API)
// 4. Resend (modern email API)
// 5. Nodemailer with SMTP (requires server)

// Option 1: EmailJS Configuration
// TODO: Set up EmailJS account and get these values
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

// Option 2: API Route Configuration (for server-side email sending)
const EMAIL_API_CONFIG = {
  sendGridApiKey: process.env.SENDGRID_API_KEY || '',
  resendApiKey: process.env.RESEND_API_KEY || '',
  fromEmail: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
  toEmail: process.env.TO_EMAIL || 'your@email.com',
};

// Client-side email sending with EmailJS
export async function sendEmailWithEmailJS(data: ContactFormData): Promise<EmailResponse> {
  try {
    // TODO: Install and import EmailJS
    // npm install @emailjs/browser
    // import emailjs from '@emailjs/browser';

    // const response = await emailjs.send(
    //   EMAILJS_CONFIG.serviceId,
    //   EMAILJS_CONFIG.templateId,
    //   {
    //     from_name: data.name,
    //     from_email: data.email,
    //     company: data.company || 'Not specified',
    //     project_type: data.project || 'Not specified',
    //     message: data.message,
    //   },
    //   EMAILJS_CONFIG.publicKey
    // );

    // return {
    //   success: true,
    //   message: 'Email sent successfully!',
    //   id: response.text,
    // };

    // Placeholder implementation
    console.log('EmailJS not configured. Email data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
    return {
      success: true,
      message: 'Email sent successfully! (Simulated)',
    };

  } catch (error) {
    console.error('Error sending email with EmailJS:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
    };
  }
}

// Server-side email sending via API route
export async function sendEmailViaAPI(data: ContactFormData): Promise<EmailResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return result;

  } catch (error) {
    console.error('Error sending email via API:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
    };
  }
}

// Form validation
export function validateContactForm(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('Name is required');
  }

  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.message.trim()) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Email template for API route usage
export function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .message { background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
          <p>You have received a new message through your portfolio contact form.</p>
        </div>
        
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.name}</div>
        </div>
        
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${data.email}</div>
        </div>
        
        ${data.company ? `
        <div class="field">
          <div class="label">Company/Production:</div>
          <div class="value">${data.company}</div>
        </div>
        ` : ''}
        
        ${data.project ? `
        <div class="field">
          <div class="label">Project Type:</div>
          <div class="value">${data.project}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <div class="label">Message:</div>
          <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function generateEmailText(data: ContactFormData): string {
  return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company/Production: ${data.company}\n` : ''}
${data.project ? `Project Type: ${data.project}\n` : ''}

Message:
${data.message}

---
This email was sent from your portfolio contact form.
  `.trim();
}