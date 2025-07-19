import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Kalau token nggak ada, redirect ke login
    return <Navigate to="/login" replace />;
  }

  return children; // Kalau token ada, render children-nya
};

export default ProtectedRoute;
