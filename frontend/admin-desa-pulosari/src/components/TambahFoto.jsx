import React, { useState } from "react";
import axios from "axios";

// Konfigurasi Axios
const apiClient = axios.create({
  baseURL: "https://backend-pulosari.anugrahdamarishakim.workers.dev/api",
  withCredentials: true,
});

const TambahFoto = () => {
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setGambar(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!gambar || !judul) {
      setError("Judul dan file foto wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("gambar", gambar); // Backend mengharapkan field 'gambar'

    try {
      const response = await apiClient.post("/galeri", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setMessage(
          "Foto berhasil diunggah! Refresh halaman untuk melihatnya di galeri."
        );
        // Kosongkan form setelah berhasil
        e.target.reset();
        setJudul("");
        setGambar(null);
        setPreview(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div id="tambah-foto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Tambah Foto</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>
        )}
        {message && (
          <p className="text-green-500 bg-green-100 p-3 rounded-lg mb-4">
            {message}
          </p>
        )}

        {/* Input file, backend mengharapkan 'gambar' bukan 'foto' */}
        <div className="mb-4">
          <label
            htmlFor="gambar"
            className="block text-sm font-medium text-gray-700"
          >
            Pilih Foto
          </label>
          <input
            type="file"
            id="gambar"
            name="gambar"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        {/* Input judul */}
        <div className="mb-4">
          <label
            htmlFor="judul"
            className="block text-sm font-medium text-gray-700"
          >
            Judul
          </label>
          <input
            type="text"
            id="judul"
            name="judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Judul foto..."
          />
        </div>
        {/* Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-xs rounded-lg border"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          <i className="fas fa-upload mr-2"></i>Tambah Foto
        </button>
      </form>
    </div>
  );
};

export default TambahFoto;
