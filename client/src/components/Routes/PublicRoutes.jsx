import React from "react";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
