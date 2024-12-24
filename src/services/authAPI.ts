import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

export const login = async (loginOrEmail: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { loginOrEmail, password });
  return response.data; // { token, user }
};

export const register = async (login: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { login, email, password });
  return response.data; // { message, user }
};
