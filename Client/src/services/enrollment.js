import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/enrollments'
const bnURL = 'http://localhost:4000'

const getEnrollments = async (courseId) => {
  const response = await axios.get(`${bnURL}/${courseId}${baseURL}`, getAuthHeader())

  return response.data
}

const updateEnrollment = async (courseId, enrollmentId, enrolledAs) => {
  const response = await axios.post(
    `${bnURL}/${courseId}${baseURL}`,
    {
      enrollmentId,
      enrolledAs
    },
    getAuthHeader()
  )
  return response.data
}

const enrollmentsService = {
  getEnrollments,
  updateEnrollment
}
export default enrollmentsService
