// import React from "react";
// import { Navigate, Outlet } from "react-router";

// const ProtectedRoute = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Outlet /> : <Navigate to="/landing" replace />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);

  return user ? <Outlet /> : <Navigate to="/landing" replace />;
};

export default ProtectedRoute;
