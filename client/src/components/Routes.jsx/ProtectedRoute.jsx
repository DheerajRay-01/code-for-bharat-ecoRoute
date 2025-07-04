import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/landing" replace />;
};

export default ProtectedRoute;
