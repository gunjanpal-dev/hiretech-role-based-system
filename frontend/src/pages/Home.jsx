import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/jobSlice";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../images/hero.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs } = useSelector((state) => state.jobs);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Update suggestions as user types
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm, jobs]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setSearch(value)); // Update Redux filter
  };

  const handleSearch = () => {
    dispatch(setSearch(searchTerm));
    navigate("/jobs");
    setSuggestions([]);
  };

  const handleSelectJob = (jobTitle) => {
    setSearchTerm(jobTitle);
    dispatch(setSearch(jobTitle));
    navigate("/jobs");
    setSuggestions([]);
  };

  const handlePostJob = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role.toLowerCase() !== "recruiter") {
      alert("Only recruiters can post jobs.");
    } else {
      navigate("/post-job");
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <main
        className="flex flex-col items-center justify-center text-center px-4"
        style={{
          background: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "90vh",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-[#7A1C3C] drop-shadow-lg">
          Welcome to HireTech
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-[#E3AFBC] max-w-2xl">
          Your one-stop platform to find your dream job or hire top talent.
        </p>

        {/* Glass Search Bar with Search Button */}
        <div className="mt-10 w-full max-w-2xl relative flex items-center">
          <input
            type="text"
            placeholder="Search jobs, e.g. Designer, Developer..."
            value={searchTerm}
            onChange={handleInputChange}
            className="flex-grow px-4 py-3 rounded-l-lg bg-white text-[#5D001E] focus:outline-none backdrop-blur-md border border-white/30"
          />

          <button
            onClick={handleSearch}
            className="ml-2 px-6 py-3 bg-[#E3AFBC] text-[#5D001E] font-semibold rounded-lg hover:bg-[#E3E2DF] transition shadow-lg"
          >
            Search
          </button>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full mt-2 bg-white/70 backdrop-blur-md border border-white/30 rounded-lg shadow-xl z-50 max-h-60 overflow-auto">
              {suggestions.map((job) => (
                <li
                  key={job._id}
                  className="px-4 py-2 hover:bg-[#E3AFBC]/30 cursor-pointer text-[#5D001E] font-medium rounded-md"
                  onClick={() => handleSelectJob(job.title)}
                >
                  {job.title} - {job.location}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/jobs"
            className="px-6 py-3 bg-[#E3AFBC] text-[#5D001E] font-semibold rounded-lg hover:bg-[#E3E2DF] transition shadow-lg"
          >
            Browse Jobs
          </Link>

          <button
            onClick={handlePostJob}
            className="px-6 py-3 bg-[#E3E2DF] text-[#5D001E] font-semibold rounded-lg hover:bg-[#E3AFBC] transition shadow-lg"
          >
            Post a Job
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;