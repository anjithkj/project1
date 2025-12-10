import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.admin);

  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
}
