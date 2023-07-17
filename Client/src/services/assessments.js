import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/assessments'
const bnURL = 'http://localhost:4000'

const getAllExams = async (courseId) => {
  const response = await axios.get(`${bnURL}/${courseId}${baseURL}`, {
    ...getAuthHeader(),
    params: { filter: 'Exam' }
  })
  return response.data
}

const getAllAssignments = async (courseId) => {
  const response = await axios.get(`${bnURL}/${courseId}${baseURL}`, {
    ...getAuthHeader(),
    params: { filter: 'Assignment' }
  })
  return response.data
}

const submitAssessment = async (courseId, assessment) => {
  const response = await axios.post(
    `${bnURL}/${courseId}${baseURL}`,
    assessment,
    getAuthHeader()
  )
  return response.data
}

const deleteAssessment = async (courseId, assessmentId) => {
  const response = await axios.delete(
    `${bnURL}/${courseId}${baseURL}/${assessmentId}`,
    getAuthHeader()
  )
  return response.data
}

const assessmentsService = {
  getAllExams,
  getAllAssignments,
  submitAssessment,
  deleteAssessment
}
export default assessmentsService
