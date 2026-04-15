// src/redux/jobSelectors.js
import { createSelector } from "@reduxjs/toolkit";

// 🔹 Basic selectors
export const selectJobs = (state) => state.jobs.jobs;
export const selectFilters = (state) => state.jobs.filters;
export const selectCurrentJob = (state) => state.jobs.currentJob;
export const selectLoading = (state) => state.jobs.loading;

// 🔹 Filtered jobs selector
export const selectFilteredJobs = createSelector(
  [selectJobs, selectFilters],
  (jobs, filters) => {
    return jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      return matchesSearch && matchesLocation;
    });
  }
);