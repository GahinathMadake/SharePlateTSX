const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to: to,
    from: process.env.SendGrid_Email,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await sgMail.send(msg);
    console.log(subject, "Mail send to User = ", to);
  }
  catch (error){
    console.error(error.message);
  }
}
  
module.exports = sendEmail;