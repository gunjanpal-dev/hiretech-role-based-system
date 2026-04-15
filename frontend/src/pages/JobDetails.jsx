import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "../redux/jobSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentJob, loading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-[#7A1C3C] font-semibold">
        Loading job details...
      </div>
    );

  if (!currentJob)
    return (
      <div className="flex justify-center items-center min-h-screen text-[#7A1C3C] font-semibold">
        Job not found
      </div>
    );

  const handleApply = () => {
    if (!user) {
      alert("Please login to apply.");
      navigate("/login");
    } else if (user.role.toLowerCase() === "recruiter") {
      alert("Recruiters cannot apply for jobs.");
    } else {
      navigate(`/apply-job/${currentJob._id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#FDE2E4]/70 via-[#F7F5F2]/70 to-[#E3AFBC]/70">
      <Navbar />

      <main className="flex-grow min-h-[85vh] relative">
  {/* RIGHT PANEL - Main Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#E3AFBC] via-[#FDE2E4] to-[#F7F5F2]" />
  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

  {/* Content Container */}
  <div className="relative z-10 flex justify-center items-start p-12">
    {/* Job Card */}
    <div className="bg-[#E3E2DF]/90 backdrop-blur-md border border-[#E3AFBC] rounded-3xl shadow-2xl p-8 max-w-4xl w-full flex flex-col gap-6">
      
      {/* Job Info */}
      <h1 className="text-3xl font-extrabold text-[#7A1C3C]">{currentJob.title}</h1>

      {/* Company + Location + Salary */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="bg-[#E3AFBC]/40 text-[#5D001E] px-3 py-1 rounded-full">{currentJob.company}</span>
        <span className="bg-[#FDE2E4]/50 text-[#7A1C3C] px-3 py-1 rounded-full">📍 {currentJob.location}</span>
        {currentJob.salary && (
          <span className="bg-[#F7F5F2]/60 text-[#7A1C3C] px-3 py-1 rounded-full">💰 {currentJob.salary}</span>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {currentJob.skillsRequired?.map((skill, idx) => (
          <span key={idx} className="bg-[#E3AFBC]/30 text-[#5D001E] px-2 py-1 rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[#5D001E]/90 text-lg leading-relaxed whitespace-pre-line">
        {currentJob.description}
      </p>

      {/* Action Buttons */}
     {/* Action Buttons */}
{/* Action Buttons */}
<div className="flex justify-between mt-6 gap-4">
  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="flex-1 bg-[#7A1C3C] text-white py-2 px-6 rounded-lg hover:bg-[#5D001E] transition mx-2"
  >
    Back
  </button>

  {/* Apply Now Button */}
  {user?.role?.toLowerCase() !== "recruiter" && (
    <button
      onClick={handleApply}
      className="flex-1 bg-[#E3AFBC] text-[#5D001E] py-2 px-6 rounded-lg hover:bg-[#F7F5F2] transition mx-2"
    >
      Apply Now
    </button>
  )}
</div>
    </div>
  </div>

  {/* Decorative Message / HireTech */}
  <div className="absolute inset-0 flex flex-col justify-start p-12 z-0">
    
    <span className="absolute bottom-4 right-4 text-4xl font-extrabold text-[#5D001E]/30 select-none pointer-events-none">
      HireTech
    </span>
  </div>
</main>

      <Footer />
    </div>
  );
};

export default JobDetails;