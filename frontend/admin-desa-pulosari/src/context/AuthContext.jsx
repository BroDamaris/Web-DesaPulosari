// src/context/AuthContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

// Ganti dengan URL API Anda yang sudah di-deploy
const API_URL = "https://backend-pulosari.anugrahdamarishakim.workers.dev";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Mulai dengan loading

  // Fungsi untuk memeriksa status sesi pengguna ke endpoint /api/me
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true, // Wajib untuk mengirim cookie sesi
      });
      if (response.data.success) {
        setUser(response.data.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("User not authenticated");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus(); // Cek status login saat aplikasi pertama kali dimuat
  }, [checkAuthStatus]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    checkAuthStatus, // Kita ekspor fungsi ini agar bisa dipanggil setelah login/logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook untuk mempermudah penggunaan context
export const useAuth = () => {
  return useContext(AuthContext);
};
