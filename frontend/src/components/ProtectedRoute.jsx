import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  // 1️⃣ Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // 2️⃣ Role check (if a role is specified)
  if (role && user.role !== role) return <Navigate to="/" replace />;

  // 3️⃣ Authorized
  return children;
};

export default ProtectedRoute;