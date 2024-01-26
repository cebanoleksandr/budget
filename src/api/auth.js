import axios from "axios";

const BASE_URL = 'https://budget-be-aleksandrs-projects-05725b1e.vercel.app';

export const loginAPI = (email, password) => {
  return axios.patch(`${BASE_URL}/users/login`, {email, password});
}

export const logoutAPI = (id) => {
  return axios.patch(`${BASE_URL}/users/${id}`, {userPart: {isAuth: false}});
}

export const updateUserAPI = (id, name) => {
  return axios.patch(`${BASE_URL}/users/${id}`, {userPart: {name}});
}

export const registerAPI = (email, password, name) => {
  return axios.post(`${BASE_URL}/users/register`, { email, password, name });
}

export const isAuthAPI = (id) => {
  return axios.get(`${BASE_URL}/users/${id}`);
}
