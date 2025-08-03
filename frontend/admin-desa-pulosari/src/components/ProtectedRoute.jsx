// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Impor useAuth

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Jika masih dalam proses pengecekan, tampilkan loading
  if (isLoading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        Loading...
      </div>
    );
  }

  // Jika sudah selesai cek dan terautentikasi, tampilkan isinya (halaman admin)
  // Jika tidak, arahkan ke halaman login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
