// src/redux/jobSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobsApi, fetchJobByIdApi, getMyJobsApi } from "../api/jobApi";

// 🔹 Fetch all jobs (for candidates / public)
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async () => {
    const response = await fetchJobsApi();
    return response.data; // array of jobs
  }
);

// 🔹 Fetch single job by ID
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id) => {
    const response = await fetchJobByIdApi(id);
    return response.data; // single job object
  }
);

// 🔹 Fetch jobs posted by logged-in recruiter
export const fetchMyJobs = createAsyncThunk(
  "jobs/fetchMyJobs",
  async (token, thunkAPI) => {
    try {
      const response = await getMyJobsApi(token);
      return response.data; // array of recruiter jobs
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch your jobs"
      );
    }
  }
);

// 🔹 Initial state
const initialState = {
  jobs: [],          // all jobs for candidates
  myJobs: [],        // jobs posted by recruiter
  currentJob: null,  // single job details
  loading: false,
  error: null,
  filters: {
    search: "",
    location: "",
  },
};

// 🔹 Slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // For search and filter functionality
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setLocation: (state, action) => {
      state.filters.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch jobs";
      })

      // 🔹 Fetch single job
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch job details";
      })

      // 🔹 Fetch recruiter jobs
      .addCase(fetchMyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.myJobs = action.payload;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch your jobs";
      });
  },
});

// ✅ Export actions
export const { setSearch, setLocation } = jobSlice.actions;

export default jobSlice.reducer;