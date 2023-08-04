const enrollEmail = (studentName, courseName,studentEmail, studentPassword, instructorName, instructorEmail) => `
Hi ${studentName},<br/><br/>

Welcome to the '${courseName}' course! We are excited to have you join us.<br/><br/>

Throughout this course, you will gain valuable insights, enhance your skills, and discover new perspectives. Our aim is to provide you with a comprehensive and enriching learning experience that will empower you in both your personal and professional life. <br/><br/>

The course content will be delivered through our user-friendly Learning Management System (LMS). You will find all the materials, assignments, quizzes, and any additional resources there. Please make sure to log in and explore the platform before the course begins. <br/><br/>

As you embark on this educational journey, remember that learning is a collaborative process. Feel free to engage in discussions, ask questions, and share your insights with your fellow learners. Together, we can create a supportive and vibrant learning community. <br/> <br/>

If you encounter any technical issues or have any questions related to the course content, assignments, or assessments, our dedicated support team is here to assist you. Don't hesitate to reach out to us at edu@melonelab.com.
<br/>
<br/>

<b>Platform Access</b>: https://www.melonelab.com
<br/>
<b>Email</b>: ${studentEmail}
<br/>
<b>Password</b>: ${studentPassword}
<br/>
<br/>
Best wishes for an enlightening and rewarding learning experience!
<br/>
<br/>

Warm regards,
<br/>
<br/>

${instructorName}
<br/>
Instructor
<br/>
Melone Lab coding boot camp
<br/>
${instructorEmail}


`

module.exports = enrollEmail
