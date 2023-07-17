import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = 'http://localhost:4000/achievements'

const getAllAchievements = async () => {
  const response = await axios.get(`${baseURL}`, getAuthHeader())
  return response.data
}

const achievementsService = {
  getAllAchievements
}
export default achievementsService
