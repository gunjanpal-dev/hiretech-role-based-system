// src/api/jobApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/jobs";

// Fetch all jobs
export const fetchJobsApi = () => axios.get(`${BASE_URL}`);

// Fetch job by ID
export const fetchJobByIdApi = (id) => axios.get(`${BASE_URL}/${id}`);

// Create job (Recruiter only)
export const createJobApi = (jobData, token) =>
  axios.post(`${BASE_URL}`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update job
export const updateJobApi = (id, jobData, token) =>
  axios.put(`${BASE_URL}/${id}`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete job
export const deleteJobApi = (id, token) =>
  axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get jobs posted by the logged-in recruiter
export const getMyJobsApi = (token) =>
  axios.get(`${BASE_URL}/myjobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });