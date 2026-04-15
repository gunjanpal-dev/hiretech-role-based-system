// src/pages/ApplyJob.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../redux/applicationSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ApplyJob = () => {
  const { id } = useParams(); // jobId
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resume, setResume] = useState(null);

  const { loading, success, error } = useSelector(state => state.application);
  const { token } = useSelector(state => state.auth);

  // Redirect after successful application
  useEffect(() => {
    if (success) {
      alert("Application submitted successfully!");
      navigate("/dashboard"); 
    }
  }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume");
      return;
    }
    dispatch(applyJob({ jobId: id, file: resume, token }));
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#FDE2E4] via-[#F7F5F2] to-[#E3AFBC]">
      <Navbar />

      <main className="flex-grow px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white/90 p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-[#7A1C3C] mb-6">Apply for Job</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              Upload Resume:
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="border p-2 rounded-md"
              />
            </label>

            {loading && <p className="text-[#7A1C3C]">Submitting application...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="py-3 bg-[#5D001E] text-white rounded-2xl font-semibold hover:bg-[#7A1C3C] transition-colors"
              disabled={loading}
            >
              Apply
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplyJob;