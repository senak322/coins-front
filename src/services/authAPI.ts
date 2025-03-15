import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const login = async (loginOrEmail: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { loginOrEmail, password });
  return response.data; // { token, user }
};

export const register = async (login: string, email: string, password: string, referralCode?: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { login, email, password, referralCode });
  return response.data; // { message, user }
};

export const verifyEmail = async (email: string, code: string) => {
  const response = await axios.post(`${API_URL}/auth/verify-email`, { email, code });
  return response.data; // { message }
};
