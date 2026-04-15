// src/api/applicationApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/applications";

// Apply for a job
export const applyJobApi = (jobId, file, token) => {
  const formData = new FormData();
  formData.append("jobId", jobId); // match backend
  formData.append("resume", file); // match multer field name

  return axios.post(`${BASE_URL}/apply`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//  Fetch all applications of the logged-in candidate
export const fetchMyApplicationsApi = (token) => {
  return axios.get(`${BASE_URL}/myapplications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//  Fetch single application (optional)
// export const fetchApplicationByIdApi = (id, token) => {
//   return axios.get(`${BASE_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
