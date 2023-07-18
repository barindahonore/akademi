const express = require('express')
const auth = require('../middleware/auth')
const courseRouter = new express.Router()

const {
  getAllCourses,
  getOneCourse,
  createCourse,
  enroll,
  unEnroll,
  deleteCourse,
  enrollByEmail,
  updateCourse,
  endCourse
} = require('../controller/courseController/courseController')

courseRouter.post('/', auth, createCourse)
courseRouter.get('/:courseId', auth, getOneCourse)
courseRouter.get('/:filter?', auth, getAllCourses)
courseRouter.put('/:courseId', auth, updateCourse)
courseRouter.delete('/:courseId', auth, deleteCourse)
courseRouter.post('/:courseId/end-course', auth, endCourse)
courseRouter.post('/:courseId/enroll', auth, enroll)
courseRouter.post('/:courseId/enroll-email', auth, enrollByEmail)
courseRouter.post('/:courseId/un-enroll', auth, unEnroll)

module.exports = courseRouter
