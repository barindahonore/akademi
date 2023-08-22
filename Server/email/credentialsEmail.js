const Course = require('../models/course');

const emailService = require('../service/email.service');
const createWelcomeEmail = require('../templates/credentialsEmailTemplate');

/**
 * Retrieves and processes user enrollments for a given course.
 * @param {string} courseId - The ID of the course to fetch enrollments for.
 */
const fetchEnrollments = async (courseId) => {
    try {
        const course = await Course.findById(courseId).populate('enrollments.user').exec();

        if (!course) {
            console.error(`No course found with ID ${courseId}`);
            return;
        }

        const enrollments = course.enrollments.map(enrollment => enrollment.user);

        const usersCredentials = enrollments.map(({ email, name, passwordConfirm }) => ({
            email,
            name,
            passwordConfirm
        }));

        console.log(usersCredentials);

        usersCredentials.forEach(userCred => {
            emailService(userCred.email, 'Melone Lab - Credentials', createWelcomeEmail(userCred.name, userCred.email, userCred.passwordConfirm));
        });
    } catch (error) {
        console.error('An error occurred while fetching enrollments:', error);
    }
};

// Example usage
fetchEnrollments("64d132717b7c45001cc52f56");

module.exports = {
    fetchEnrollments
};
























// const Course = require('../models/course')
// const Achievement = require('../models/achievement')
// const Grades = require('../models/gradesSummary')
// const User = require('../models/user')

// const emailService = require('../service/email.service')
// const createWelcomeEmail = require('../templates/credentialsEmailTemplate')

// // const getEnrollments = async (courseId) => {
// //     let enrollments = await Course.findById(courseId).populate('enrollments.user').exec()
// //     const users = enrollments !== null ? enrollments.enrollments.map(enrollment => enrollment.user) : [];
// //     const usersCredentials = users.map(({email, passwordConfirm})=>({email,passwordConfirm}))
// //     console.log(usersCredentials)
// // }
// // getEnrollments("64d132717b7c45001cc52f56")



// const fetchEnrollments = async (courseId) => {
//     try {
//         const course = await Course.findById(courseId).populate('enrollments.user').exec();

//         if (!course) {
//             console.error(`No course found with ID ${courseId}`);
//             return;
//         }

//         const enrollments = course.enrollments.map(enrollment => enrollment.user);

//         const usersCredentials = enrollments.map(({ email,name, passwordConfirm }) => ({
//             email,
//             name,
//             passwordConfirm
//         }));

//         console.log(usersCredentials);


//         usersCredentials.forEach(userCred => {
//             // const emailText = `Hello, your temporary password is: ${userCred.password}`;
//             emailService(userCred.email, 'Melone Lab - Credentials', createWelcomeEmail(userCred.name, userCred.email, userCred.passwordConfirm));
//         });




//     } catch (error) {
//         console.error('An error occurred while fetching enrollments:', error);
//     }
// };

// fetchEnrollments("64d132717b7c45001cc52f56");






// module.exports = {fetchEnrollments}