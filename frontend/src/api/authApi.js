

import axios from "axios";


const BASE_URL = "http://localhost:5000"; 

export const loginUserApi = async (formData) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
  return response.data;
};
export const signupUserApi = async (formData) => {
  const response = await axios.post(`${BASE_URL}/api/auth/signup`, formData);
  return response.data;
};