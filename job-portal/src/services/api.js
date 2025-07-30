import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job API endpoints
export const jobAPI = {
  // Get all jobs
  getAllJobs: () => api.get('/'),
  
  // Get job by ID
  getJobById: (id) => api.get(`/jobs/${id}`),
  
  // Create new job
  createJob: (jobData) => api.post('/jobs', jobData),
  
  // Update job
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  
  // Delete job
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

export default api;