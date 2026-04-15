import React from "react";
import { useSelector } from "react-redux";

// Layout components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

// Role-based components
import CandidateView from "../components/CandidateView";
import RecruiterView from "../components/RecruiterView";
import AdminView from "../components/AdminView";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Loader />;

  const renderRoleSection = () => {
    switch (user.role) {
      case "candidate":
        return <CandidateView />;
      case "recruiter":
        return <RecruiterView />;
      case "admin":
        return <AdminView />;
      default:
        return (
          <p className="text-red-400 text-center">Role not recognized</p>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#FDE2E4]/70 via-[#F7F5F2]/70 to-[#E3AFBC]/70">
      <Navbar />

      <main className="flex-grow px-4 py-16 flex flex-col items-center gap-12">
        {renderRoleSection()}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;