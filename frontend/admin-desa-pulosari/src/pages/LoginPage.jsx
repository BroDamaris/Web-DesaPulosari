import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../assets/index.css"; // Import your CSS styles

// It's a good practice to keep constants outside the component if they don't depend on props or state.
const API_URL = "https://backend-pulosari.anugrahdamarishakim.workers.dev";

const LoginPage = () => {
  // --- STATE MANAGEMENT ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  // --- EVENT HANDLERS ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state to true

    try {
      await axios.post(
        `${API_URL}/api/auth/login`,
        { username, password }, // Send username and password in the request body
        { withCredentials: true }
      );
      await checkAuthStatus(); // Update global authentication status
      navigate("/"); // Navigate to the home page on successful login
    } catch (err) {
      // Set a user-friendly error message from the server response, or a default one
      setError(err.response?.data?.message || "Username atau password salah.");
      console.error("Login failed:", err);
    } finally {
      setLoading(false); // Set loading state to false after the request finishes
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state for password visibility
  };

  // --- JSX RENDER ---
  return (
    // Main container that centers the login card
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full opacity-20 floating-animation"></div>
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400 rounded-full opacity-15 floating-animation"
        style={{ animationDelay: "-3s" }}
      ></div>
      <div
        className="absolute top-1/3 left-1/4 w-32 h-32 bg-green-300 rounded-full opacity-10 floating-animation"
        style={{ animationDelay: "-1s" }}
      ></div>

      {/* Login Container */}
      <div className="relative w-full max-w-md z-10">
        {/* Main Login Card with glass effect */}
        <div className="glass-effect rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white bg-opacity-20 rounded-full mb-4 pulse-green">
              <i className="fas fa-building text-4xl text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Sistem Informasi Desa
            </h1>
            <p className="text-green-100">Portal Admin Desa</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Alert Display - shows only when 'error' state is not empty */}
            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-green-100"
              >
                <i className="fas fa-user mr-2"></i>Username Admin
              </label>
              <div className="relative">
                <input
                  type="text" // Correct input type
                  id="username"
                  name="username"
                  value={username} // Bind value to state
                  onChange={(e) => setUsername(e.target.value)} // Update state on change
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-green-300 border-opacity-30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent input-glow transition-all duration-300"
                  placeholder="Masukkan username admin"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <i className="fas fa-user-shield text-green-300"></i>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-100"
              >
                <i className="fas fa-lock mr-2"></i>Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Dynamically set type
                  id="password"
                  name="password"
                  value={password} // Bind value to state
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-green-300 border-opacity-30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent input-glow transition-all duration-300"
                  placeholder="Masukkan password"
                />
                <button
                  type="button" // Important: type="button" to prevent form submission
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-300 hover:text-green-200 transition-colors duration-200"
                >
                  {/* Change icon based on state */}
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin mr-2"></i>Memproses...
                </span>
              ) : (
                <span>
                  <i className="fas fa-sign-in-alt mr-2"></i>Masuk sebagai Admin
                </span>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-green-200 opacity-80">
              <i className="fas fa-shield-alt mr-1"></i>
              Akses terbatas untuk administrator desa
            </p>
            <p className="text-xs text-green-200 opacity-60 mt-2">
              © 2025 Sistem Informasi Desa
            </p>
          </div>
        </div>
        {/* Info untuk warga desa */}
        <div className="mt-6 glass-effect rounded-xl p-4 text-center">
          <p className="text-green-100 text-sm">
            <i className="fas fa-info-circle mr-2"></i>
            Untuk warga desa, layanan dapat diakses tanpa login
          </p>
          <a
            href="https://website-desa-pulosari.anugrahdamarishakim.workers.dev/"
            className="inline-block mt-2 text-green-300 hover:text-green-200 text-sm font-medium transition-colors duration-200"
          >
            Kembali ke Beranda <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
