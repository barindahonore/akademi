import axios from 'axios'
import { getAuthHeader } from './config'
import { notification } from 'antd'
import {baseURLref} from '../constants/bnReference'


export const baseURL = '/notification'

const getAllNotifications = async () => {
  const response = await axios.get(
    `${baseURLref}/${baseURL}/getNotificationsOfUser`,
    getAuthHeader()
  )
  return response.data
}

const push = async (data) => {
  const response = await axios.post(
    `${baseURLref}/${baseURL}/push`,
    {
      data: data
    },
    getAuthHeader()
  )
  return response.data
}

const create = async (data, type, to) => {
  const response = await axios.post(
    `${baseURLref}/${baseURL}/createNotification`,
    {
      data: data,
      type: type,
      to: to
    },
    getAuthHeader()
  )
  return response.data
}

const edit = async (oldNot, newNot) => {
  const response = await axios.put(
    `${baseURLref}/${baseURL}/editNotification`,
    {
      oldNot: oldNot,
      newNot: newNot
    },
    getAuthHeader()
  )
  return response.data
}

const del = async (not) => {
  const response = await axios.delete(
    `${baseURLref}/${baseURL}/deleteNotification/`+not,
    getAuthHeader()
  )
  return response.data
}

const delAll = async () => {
  const response = await axios.delete(
    `${baseURLref}/${baseURL}/deleteNotificationsOfUser`,
    getAuthHeader()
  )
  return response.data
}

const unsubscribe = async () => {
  const response = await axios.delete(`${baseURLref}/${baseURL}/unsubscribe`, getAuthHeader())
  if (response.data === 'unsubscribed') {
    notification.success({
      message: 'unsubscribed Successfully'
    })
  } else {
    notification.error({
      message: 'already unsubscribed'
    })
  }
  return response.data
}

const notificationsService = {
  getAllNotifications,
  push,
  create,
  edit,
  del,
  delAll,
  unsubscribe
}
export default notificationsService
