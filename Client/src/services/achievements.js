import axios from 'axios'
import { getAuthHeader } from './config'
import {baseURLref} from '../constants/bnReference'

export const baseURL = `${baseURLref}/achievements`

const getAllAchievements = async () => {
  const response = await axios.get(`${baseURL}`, getAuthHeader())
  return response.data
}

const achievementsService = {
  getAllAchievements
}
export default achievementsService
