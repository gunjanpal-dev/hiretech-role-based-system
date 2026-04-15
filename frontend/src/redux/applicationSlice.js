// src/redux/applicationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applyJobApi, fetchMyApplicationsApi } from "../api/applicationApi";

// ✅ Async thunk to apply for a job
export const applyJob = createAsyncThunk(
  "applications/applyJob",
  async ({ jobId, file, token }, thunkAPI) => {
    try {
      const response = await applyJobApi(jobId, file, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to apply for job"
      );
    }
  }
);

// ✅ New thunk to fetch candidate's applications
export const fetchMyApplications = createAsyncThunk(
  "applications/fetchMyApplications",
  async (token, thunkAPI) => {
    try {
      const response = await fetchMyApplicationsApi(token);
      return response.data; // array of applications
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  }
);

// ✅ Initial state
const initialState = {
  loading: false,
  success: false,
  error: null,
  myApplications: [], // new state for candidate applications
};

// ✅ Slice
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    resetApplicationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.myApplications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply job cases
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Fetch my applications cases
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;