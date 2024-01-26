import axios from "axios"

const BASE_URL = 'https://budget-be-aleksandrs-projects-05725b1e.vercel.app'

export const createRecordAPI = (record) => {
  return axios.post(`${BASE_URL}/records`, { record })
}

export const getRecordsAPI = (userId) => {
  return axios.get(`${BASE_URL}/records/${userId}`)
}

export const getRecordAPI = (id) => {
  return axios.get(`${BASE_URL}/records/record/${id}`)
    .catch(e => {
      return new Error(e)
    })
}

export const removeRecordsAPI = (id) => {
  return axios.delete(`${BASE_URL}/records/${id}`)
}

export const updateRecordsAPI = (id, recordPart) => {
  return axios.patch(`${BASE_URL}/records/${id}`, { recordPart })
}
