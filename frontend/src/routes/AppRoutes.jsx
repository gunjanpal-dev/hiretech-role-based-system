import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import About from "../pages/About";
import JobListPage from "../pages/JobListPage";
import JobDetails from "../pages/JobDetails";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PostJob from "../pages/PostJob";
import Parallax from "../pages/Parallax";
import ProtectedRoute from "../components/ProtectedRoute";
import ApplyJob from "../pages/ApplyJob";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/jobs" element={<JobListPage />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/parallax" element={<Parallax />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-job"
        element={
          <ProtectedRoute role="recruiter">
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply-job/:id"
        element={<ApplyJob/> }
      />

     

      {/* 404 Fallback */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>

    
  );
};

export default AppRoutes;