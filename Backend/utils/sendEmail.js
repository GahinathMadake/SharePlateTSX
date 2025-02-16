const sgMail = require('@sendgrid/mail');

const sendEmail = async (to, subject, text, html) => {
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SendGrid API key is not configured');
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: to,
        from: {
            email: process.env.SENDGRID_EMAIL,
            name: 'SharePlate' // Add a sender name
        },
        subject: subject,
        text: text || 'Please enable HTML to view this email',
        html: html
    };

    try {
        console.log('Attempting to send email with config:', {
            to: msg.to,
            from: msg.from,
            subject: msg.subject
        });

        const response = await sgMail.send(msg);
        console.log('SendGrid Response:', {
            statusCode: response[0].statusCode,
            headers: response[0].headers
        });
        return true;
    } catch (error) {
        console.error('SendGrid Error Details:', {
            message: error.message,
            errors: error.response?.body?.errors,
            code: error.code,
            fullError: JSON.stringify(error.response?.body, null, 2)
        });
        throw error;
    }
};

module.exports = sendEmail;