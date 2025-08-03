import React, { useState, useEffect } from "react";
import axios from "axios"; // 1. Impor axios

const DashboardContent = () => {
  // State untuk menyimpan data count
  const [beritaCount, setBeritaCount] = useState(0);
  const [galeriCount, setGaleriCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // useEffect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 2. Gunakan axios.get untuk mengambil data secara bersamaan
        const [beritaResponse, galeriResponse, usersResponse] =
          await Promise.all([
            axios.get(
              "https://backend-pulosari.anugrahdamarishakim.workers.dev/api/berita",
              { withCredentials: true }
            ), // Ganti dengan endpoint Anda jika berbeda
            axios.get(
              "https://backend-pulosari.anugrahdamarishakim.workers.dev/api/galeri",
              { withCredentials: true }
            ),
            axios.get(
              "https://backend-pulosari.anugrahdamarishakim.workers.dev/api/users",
              { withCredentials: true }
            ),
          ]);

        // 3. Akses data dari properti `data` milik axios
        // Data dari backend Anda ada di dalam `response.data.data`
        if (beritaResponse.data.success) {
          setBeritaCount(beritaResponse.data.data.length); //
        }
        if (galeriResponse.data.success) {
          setGaleriCount(galeriResponse.data.data.length); //
        }
        if (usersResponse.data.success) {
          setUsersCount(usersResponse.data.data.length); //
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        // axios akan masuk ke blok catch ini jika status respons bukan 2xx
      } finally {
        setLoading(false); // Hentikan loading setelah selesai
      }
    };

    fetchData();
  }, []); // Array kosong memastikan ini hanya berjalan sekali

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Selamat Datang di Admin Panel
      </h1>
      <p className="text-gray-600">
        Pilih menu di sidebar untuk mulai mengelola website desa.
      </p>
      <div id="contentArea" className="mt-8"></div>
      <div id="dashboard">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Berita */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
            <i className="fas fa-newspaper text-2xl mb-2"></i>
            <h3 className="text-lg font-semibold">Total Berita</h3>
            <p className="text-2xl font-bold">
              {loading ? "..." : beritaCount}
            </p>
          </div>
          {/* Card Galeri */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
            <i className="fas fa-images text-2xl mb-2"></i>
            <h3 className="text-lg font-semibold">Galeri Foto</h3>
            <p className="text-2xl font-bold">
              {loading ? "..." : galeriCount}
            </p>
          </div>
          {/* Card Pengguna */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <i className="fas fa-users text-2xl mb-2"></i>
            <h3 className="text-lg font-semibold">Pengguna</h3>
            <p className="text-2xl font-bold">{loading ? "..." : usersCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
