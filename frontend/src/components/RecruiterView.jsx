import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import Loader from "./Loader";
import { fetchMyJobs } from "../redux/jobSlice";

const RecruiterView = () => {
  const dispatch = useDispatch();
  const { myJobs, loading, error } = useSelector((state) => state.jobs);
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchMyJobs(token));
    }
  }, [dispatch, token]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#7A1C3C] drop-shadow-lg">
          Welcome {user?.name || "Recruiter"}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-[#5D001E]/90 max-w-2xl mx-auto">
          Manage your job postings and track applications efficiently.
        </p>
      </div>

      {/* Jobs Container */}
      <div className="max-w-6xl mx-auto">
        {/* Loading */}
        {loading && <Loader />}

        {/* Error */}
        {error && <p className="text-red-400 text-center mb-6">{error}</p>}

        {/* Empty State */}
        {!loading && myJobs?.length === 0 && (
          <p className="text-gray-400 text-center mb-6">
            You have not posted any jobs yet.
          </p>
        )}

        {/* Jobs Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-center">
          {myJobs &&
            myJobs.map((job) => (
              <div
                key={job._id}
                className="p-6 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-2xl transition max-w-2xl w-full mx-auto"
              >
                <JobCard job={job} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterView;