const User = require('../models/user')
const emailService = require('./email.service')

const customMailer= async (emailAddresses, subject, body) => {
  
    try {
      // Loop through email addresses and send emails
      for (const email of emailAddresses) {
        // Retrieve user details from the database (User model)
        const user = await User.findOne({ email });
        if (!user) {
          console.log(`User not found for email: ${email}`);
          continue;
        }
  
        // Replace user parameters in subject and body
        let personalizedSubject = subject;
        let personalizedBody = body;
  
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            const value = user[key];
            const placeholder = `{{${key}}}`;
            personalizedSubject = personalizedSubject.split(placeholder).join(value);
            personalizedBody = personalizedBody.split(placeholder).join(value);
          }
        }
  
        // Send the email
        await emailService(user.email, personalizedSubject, personalizedBody);
        console.log(`Email sent to ${user.email}`);
        return true
      }
  
      res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports= {customMailer}