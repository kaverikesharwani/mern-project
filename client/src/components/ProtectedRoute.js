import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  // If authenticated render nested routes (Outlet) or children
  return <Outlet />;
};

export default ProtectedRoute;
