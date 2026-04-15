// src/pages/JobListPage.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../redux/jobSlice";
import JobList from "../components/JobList"; // ensure path correct
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JobListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all jobs when page loads
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#FDE2E4] via-[#F7F5F2] to-[#E3AFBC]">
      <Navbar />

      <main className="flex-grow px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#7A1C3C] to-[#E3AFBC] mb-12">
            Available Jobs
          </h1>

          {/* JobList shows filtered jobs automatically */}
          <JobList />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobListPage;