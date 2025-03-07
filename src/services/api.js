import axios from 'axios';

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


export const createUser = (userData) => {
  return api.post(`/wp/v2/users/register`, userData);
};

export const createJob = (job) => {
  return api.post(`/job/save_job`, job);
};

export default api;
