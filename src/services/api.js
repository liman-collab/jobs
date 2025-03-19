import axios from 'axios';

const baseUrl = 'http://localhost:8088/';
const apiUrl = `${baseUrl}wp-json/jwt-auth/v1/`;

const api = axios.create({
  baseURL: 'http://localhost:8088/wp-json/', 
});

export const getJob = () => {
  return api.get(`/job/get_jobs`); 
};

export const getJobType = () => {
  return api.get(`/job/get_job_type`); 
};

export const getCities = () => {
  return api.get(`/cities/get_cities`); 
};

export const createUser = async (userData) => {
  console.log(userData);
  try {
    const response = await api.post(`/v2/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const createJob = (job) => {
  return api.post(`/job/save_job`, job);
};

export const getOrderFromUserId = (token) => {
  return api.get('/custom/v1/user-orders-on-hold', {
    headers: {
      Authorization: `Bearer ${token}`, // Include auth token
    },
  });
};


export const authenticate = async (username, password) => {
  const body = JSON.stringify({ username, password });

  const response = await fetch(`${apiUrl}token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await response.json();

  if (response.status !== 200) {
    console.error(`Error: ${data.message}`);
    return false;
  }

  if (data.token) {
    return data.token;
  }

  return false;
};


export const verifyToken = async (token) => {
  const response = await fetch(`${apiUrl}token/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    console.error(`Error: ${data.message}`);
    return false;
  }

  return data;
};


export default api;
