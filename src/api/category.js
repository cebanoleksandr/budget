import axios from "axios";

const BASE_URL = 'https://budget-be-aleksandrs-projects-05725b1e.vercel.app';

export const createCategory = (userId, { title, limit }) => {
  return axios.post(`${BASE_URL}/categories/${userId}`, { title, limit });
}

export const getCategoriesAPI = (userId) => {
  return axios.get(`${BASE_URL}/categories/${userId}`);
}

export const removeCategory = (id) => {
  return axios.delete(`${BASE_URL}/categories/${id}`);
}

export const updateCategory = (id, { title, limit }) => {
  return axios.patch(`${BASE_URL}/categories/${id}`, { title, limit });
}
