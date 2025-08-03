import React, { useState } from "react";
import axios from "axios";

// Instance Axios untuk request yang lebih bersih
const apiClient = axios.create({
  baseURL: "https://backend-pulosari.anugrahdamarishakim.workers.dev/api", // Asumsikan API Anda berada di bawah /api
  withCredentials: true, // Untuk mengirim cookie otentikasi
});

const TambahBerita = ({ onBeritaAdded }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.target);
    // 'judul', 'isi', dan 'gambar' diambil dari nama input di form

    try {
      const response = await apiClient.post("/berita", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccess("Berita berhasil ditambahkan!");
        e.target.reset(); // Mengosongkan form setelah berhasil
        if (onBeritaAdded) {
          onBeritaAdded(); // Memanggil fungsi untuk me-refresh daftar berita
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Gagal menambahkan berita: ${errorMessage}`);
    }
  };

  return (
    <div id="tambah-berita">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Tambah Berita</h2>
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>
      )}
      {success && (
        <p className="text-green-500 bg-green-100 p-3 rounded-lg mb-4">
          {success}
        </p>
      )}
      <form
        id="addBeritaForm"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow"
      >
        <div className="mb-4">
          <label
            htmlFor="judul"
            className="block text-sm font-medium text-gray-700"
          >
            Judul Berita
          </label>
          <input
            type="text"
            id="judul"
            name="judul"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="isi"
            className="block text-sm font-medium text-gray-700"
          >
            Konten Berita
          </label>
          <textarea
            id="isi"
            name="isi"
            rows="6"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="gambar"
            className="block text-sm font-medium text-gray-700"
          >
            Gambar Berita
          </label>
          <input
            type="file"
            id="gambar"
            name="gambar"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          <i className="fas fa-plus mr-2"></i>Tambah Berita
        </button>
      </form>
    </div>
  );
};

export default TambahBerita;
