// import React from "react";
// import { Navigate, Outlet } from "react-router";

// const PublicRoutes = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
// };

// export default PublicRoutes;

import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const user = useSelector((state) => state.user.user);

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
  
