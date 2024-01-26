import axios from "axios";

const BASE_URL = 'https://budget-be-aleksandrs-projects-05725b1e.vercel.app';

export const getBillAPI = (id) => {
  return axios.get(`${BASE_URL}/bills/${id}`);
}

export const removeBillAPI = (id) => {
  return axios.delete(`${BASE_URL}/bills/${id}`);
}

export const createBillAPI = (userId, bill) => {
  return axios.post(`${BASE_URL}/bills`, { userId, bill });
}

export const updateBillAPI = (id, sum) => {
  return axios.patch(`${BASE_URL}/bills/${id}`, { sum });
}