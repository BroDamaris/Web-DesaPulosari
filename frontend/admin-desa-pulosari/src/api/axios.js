import axios from "axios";

const API_BASE_URL = "https://backend-pulosari.anugrahdamarishakim.workers.dev";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Mengirim cookie otentikasi di setiap permintaan
});

// Opsional: Interceptor untuk menangani error secara global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Jika tidak terotentikasi, bisa redirect ke login atau tampilkan notifikasi
      console.error(
        "Akses Ditolak. Sesi mungkin telah berakhir.",
        error.response
      );
      // Contoh: window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
