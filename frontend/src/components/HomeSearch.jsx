import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeSearch = () => {
  const navigate = useNavigate();
  const { jobs } = useSelector((state) => state.jobs);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Filter jobs locally for dropdown
  useEffect(() => {
    if (searchTerm.length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filtered);
  }, [searchTerm, jobs]);

  const handleSelect = (jobId) => {
    // Navigate to job details or JobList page filtered by this job
    navigate(`/jobs/${jobId}`);
    setSearchTerm(""); // clear input
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        placeholder="Search jobs, e.g. Designer, Developer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border focus:outline-none"
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
          {suggestions.map((job) => (
            <li
              key={job._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(job._id)}
            >
              {job.title} - {job.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeSearch;