const createWelcomeEmail = (studentName, studentEmail, studentPassword) => `
Hello ${studentName},<br/><br/>

Welcome again to Melone Lab Coding Boot Camp! <br/><br/>

Access Credentials:<br/>
- Platform: https://www.melonelab.com<br/>
- Email: ${studentEmail}<br/>
- Password: ${studentPassword}<br/><br/>

Kindly prepare for the assessment on August 10th, 5:00 pm GMT+2. Ensure platform familiarity for a seamless experience.<br/><br/>

For inquiries, reach us at edu@melonelab.com.<br/><br/>

Best regards,<br/>
Melone Lab Team
`;

module.exports = createWelcomeEmail;
