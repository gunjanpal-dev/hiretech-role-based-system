import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteJobApi } from "../api/jobApi";
import { FiTrash2 } from "react-icons/fi";
import { fetchJobs } from "../redux/jobSlice";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const handleEdit = () => {
    navigate("/post-job", { state: { job } });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJobApi(job._id, token);
      alert("Job deleted successfully!");
      dispatch(fetchJobs());
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-[#E3AFBC] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      
      {/* Title + Applicants + Delete Icon */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-[#7A1C3C]">{job.title}</h2>
          {/* Applicants count */}
          {/* <p className="text-sm text-gray-700 mt-1">
            Applicants: <span className="font-medium">{job.applicants?.length || 0}</span>
          </p> */}
        </div>

        {user?.role === "recruiter" && (
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-red-600 rounded-full transition-colors"
          >
            <FiTrash2 className="text-red-500 text-xl hover:text-white" />
          </button>
        )}
      </div>

      {/* Company */}
      <p className="text-[#5D001E] font-semibold">{job.company}</p>

      {/* Location & Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="bg-[#E3AFBC]/40 text-[#5D001E] px-3 py-1 rounded-full text-sm font-medium">
          {job.location}
        </span>
        {job.skillsRequired?.map((skill, idx) => (
          <span
            key={idx}
            className="bg-[#FDE2E4]/50 text-[#7A1C3C] px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Salary */}
      {job.salary && (
        <p className="mt-3 text-[#7A1C3C] font-semibold">Salary: {job.salary}</p>
      )}

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <Link
          to={`/jobs/${job._id}`}
          className="flex-1 text-center py-3 bg-[#5D001E] text-white rounded-2xl font-semibold hover:scale-105 transition-transform duration-300"
        >
          View Details
        </Link>
        
        {user?.role === "recruiter" && (
          <button
            onClick={handleEdit}
            className="flex-1 py-3 bg-[#7A1C3C] text-white rounded-2xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;