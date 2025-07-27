import React from "react"; 
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("TaskMaster-app-token");
  return token ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;

