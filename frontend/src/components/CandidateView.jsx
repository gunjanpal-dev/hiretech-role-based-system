import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyApplications } from "../redux/applicationSlice";
import ApplicationCard from "./ApplicationCard";
import Loader from "./Loader";

const CandidateView = () => {
  const dispatch = useDispatch();
  const { myApplications, loading, error } = useSelector(
    (state) => state.application
  );
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchMyApplications(token));
    }
  }, [dispatch, token]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#7A1C3C] drop-shadow-lg">
          Welcome {user?.name || "Candidate"}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-[#5D001E]/90 max-w-2xl mx-auto">
          Track your job applications and explore opportunities curated for you.
        </p>
      </div>

      {/* Applications Container */}
      <div className="max-w-6xl mx-auto">
        {/* Loading */}
        {loading && <Loader />}

        {/* Error */}
        {error && <p className="text-red-400 text-center mb-6">{error}</p>}

        {/* Empty State */}
        {!loading && myApplications?.length === 0 && (
          <p className="text-gray-400 text-center mb-6">
            You have not applied to any jobs yet.
          </p>
        )}

        {/* Applications List */}
        <div className="grid gap-6">
          {myApplications &&
            myApplications.map((app) => (
              <div
                key={app._id}
                className="p-6 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-2xl transition"
              >
                <ApplicationCard application={app} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateView;