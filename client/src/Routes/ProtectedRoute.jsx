import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Pages/UserContext"; 

const ProtectedRoute = ({ children, requiredRole }) => {
  const [userAuth] = useAuth();

  if (!userAuth) {
    return <div>Loading...</div>;
  }

  if (!userAuth?.token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userAuth?.user?.role !== requiredRole) {
    return <Navigate to="*" />;
  }

  return children;
};

export default ProtectedRoute;
