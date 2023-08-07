const enrollEmail = (studentName, courseName, studentEmail, studentPassword, instructorName, instructorEmail) => `
Hi ${studentName},<br/><br/>

Welcome to the '${courseName}' course at Melone Lab Coding Boot Camp! We are excited to have you join us for this enriching learning experience.<br/><br/>

This course provides valuable insights into HTML, CSS, and JavaScript, empowering you in both your personal and professional life. While going through the course content is not mandatory, we highly recommend you explore it thoroughly to make the most of the learning opportunities.<br/><br/>

The course content will be delivered through our user-friendly Learning Management System (LMS). You will find all the materials, assignments, quizzes, and additional resources there. Please log in and familiarize yourself with the platform before the course begins.<br/><br/>

As you embark on this educational journey, remember that learning is a collaborative process. Feel free to engage in discussions, ask questions, and share your insights with your fellow learners. Together, we can create a supportive and vibrant learning community.<br/><br/>

Mark your calendars and make sure to prepare for the mandatory assessment on August 7th, where you will have the chance to showcase your skills in HTML, CSS, and JavaScript. The assessment is a crucial part of the course, and your participation is required to gauge your progress and ensure a successful learning experience.<br/><br/>

If you encounter any technical issues or have questions related to the course content, assignments, or assessments, our dedicated support team is here to assist you. Don't hesitate to reach out to us at edu@melonelab.com.<br/>
<br/>

<b>Platform Access</b>: https://www.melonelab.com<br/>
<b>Email</b>: ${studentEmail}<br/>
<b>Password</b>: ${studentPassword}<br/>
<br/>

Best wishes for an enlightening and rewarding learning experience!<br/><br/>

Warm regards,<br/><br/>
${instructorName}<br/>
Instructor<br/>
Melone Lab Coding Boot Camp<br/>
${instructorEmail}
`;

module.exports = enrollEmail;












// const enrollEmail = (studentName, courseName,studentEmail, studentPassword, instructorName, instructorEmail) => `
// Hi ${studentName},<br/><br/>

// Welcome to the '${courseName}' course! We are excited to have you join us.<br/><br/>

// Throughout this course, you will gain valuable insights, enhance your skills, and discover new perspectives. Our aim is to provide you with a comprehensive and enriching learning experience that will empower you in both your personal and professional life. <br/><br/>

// The course content will be delivered through our user-friendly Learning Management System (LMS). You will find all the materials, assignments, quizzes, and any additional resources there. Please make sure to log in and explore the platform before the course begins. <br/><br/>

// As you embark on this educational journey, remember that learning is a collaborative process. Feel free to engage in discussions, ask questions, and share your insights with your fellow learners. Together, we can create a supportive and vibrant learning community. <br/> <br/>

// If you encounter any technical issues or have any questions related to the course content, assignments, or assessments, our dedicated support team is here to assist you. Don't hesitate to reach out to us at edu@melonelab.com.
// <br/>
// <br/>

// <b>Platform Access</b>: https://www.melonelab.com
// <br/>
// <b>Email</b>: ${studentEmail}
// <br/>
// <b>Password</b>: ${studentPassword}
// <br/>
// <br/>
// Best wishes for an enlightening and rewarding learning experience!
// <br/>
// <br/>

// Warm regards,
// <br/>
// <br/>

// ${instructorName}
// <br/>
// Instructor
// <br/>
// Melone Lab coding boot camp
// <br/>
// ${instructorEmail}


// `

// module.exports = enrollEmail
