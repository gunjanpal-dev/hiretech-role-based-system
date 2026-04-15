// src/components/Navbar.jsx
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHireAHelper } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-[#E3AFBC] font-semibold"
      : "text-[#E3E2DF] hover:text-[#E3AFBC] transition duration-200";

  return (
    <nav className="bg-[#5D001E] shadow-md">
      <div className="flex justify-between items-center h-16 px-6">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <FaHireAHelper className="text-[#E3AFBC] text-3xl" />
          <span className="text-2xl font-bold text-[#E3E2DF]">
            HireTech
          </span>
        </NavLink>

        {/* Tabs */}
        <div className="flex items-center space-x-4 md:space-x-6">
          
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/jobs" className={linkClass}>
            Jobs
          </NavLink>

          {/* ✅ Show Signup ONLY when NOT logged in */}
          {!user && (
            <NavLink
              to="/signup"
              className="px-3 py-1 bg-[#E3AFBC] text-[#5D001E] rounded hover:opacity-90 transition"
            >
              Signup
            </NavLink>
          )}

          {/* ✅ Login / Logout Toggle */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-[#E3E2DF] text-[#5D001E] rounded hover:opacity-90 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-[#E3E2DF] text-[#5D001E] rounded hover:opacity-90 transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;