import axios from 'axios'
import { getAuthHeader } from './config'
import {baseURLref} from '../constants/bnReference'

const getDeadLines = async () => {
  const response = await axios.get(`${baseURLref}/deadlines`, getAuthHeader())
  return response.data
}

const getDeadLinesCalendar = async () => {
  const response = await axios.get(`${baseURLref}/deadlines/calendar`, getAuthHeader())
  return response.data
}

const deadlinesService = {
  getDeadLines,
  getDeadLinesCalendar
}
export default deadlinesService
