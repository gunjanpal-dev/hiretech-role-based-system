import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createJobApi, updateJobApi } from "../api/jobApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PostJob = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const editJob = location.state?.job; // 👈 job data if editing
  const isEditing = !!editJob;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    skillsRequired: "",
  });

  // ✅ Prefill form when editing
  useEffect(() => {
    if (isEditing) {
      setFormData({
        ...editJob,
        skillsRequired: editJob.skillsRequired?.join(", "),
      });
    }
  }, [editJob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler (Add + Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("TOKEN:", token);
    setLoading(true);
    

    try {
      const dataToSend = {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((s) => s.trim()),
      };

      if (isEditing) {
        await updateJobApi(editJob._id, dataToSend, token);
        alert("Job updated successfully!");
      } else {
        await createJobApi(dataToSend, token);
        alert("Job posted successfully!");
      }

      navigate("/jobs");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#FDE2E4] via-[#F7F5F2] to-[#E3AFBC]">
      <Navbar />

      <main className="flex-grow flex justify-center items-start px-4 py-16">
        <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-[#F7A1C3C] transition-all duration-300">
          
          {/* ✅ Dynamic heading */}
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7A1C3C] to-[#E3AFBC] mb-8 text-center">
            {isEditing ? "Edit Job" : "Post a New Job"}
          </h1>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            {[
              { name: "title", placeholder: "Job Title" },
              { name: "company", placeholder: "Company Name" },
              { name: "location", placeholder: "Location" },
              { name: "salary", placeholder: "Salary" },
              { name: "skillsRequired", placeholder: "Skills (comma separated)" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="p-4 border border-[#E3AFBC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7A1C3C]"
              />
            ))}

            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
              className="p-4 border border-[#E3AFBC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7A1C3C]"
            />

            {/* ✅ Dynamic button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#5D001E] text-white py-4 rounded-2xl hover:scale-105 transition-transform duration-300 text-lg font-bold disabled:opacity-50"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Posting..."
                : isEditing
                ? "Update Job"
                : "Post Job"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostJob;