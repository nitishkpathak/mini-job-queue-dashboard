import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchJobs = async (status) => {
  const params = status && status !== 'all' ? { status } : {};
  const response = await apiClient.get('/jobs', { params });
  return response.data;
};

export const fetchJobCounts = async () => {
  const response = await apiClient.get('/jobs/counts');
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await apiClient.post('/jobs', jobData);
  return response.data;
};

export const updateJobStatus = async (id, status) => {
  const response = await apiClient.patch(`/jobs/${id}/status`, { status });
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await apiClient.delete(`/jobs/${id}`);
  return response.data;
};
