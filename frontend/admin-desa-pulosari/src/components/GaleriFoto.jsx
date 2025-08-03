import React, { useState, useEffect } from "react";
import axios from "axios";

// Konfigurasi Axios
const apiClient = axios.create({
  baseURL: "https://backend-pulosari.anugrahdamarishakim.workers.dev/api",
  withCredentials: true,
});

// Komponen Modal Edit (didefinisikan di dalam file yang sama)
const EditFotoModal = ({ item, onSave, onCancel }) => {
  const [judul, setJudul] = useState(item.judul);
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(item.gambar);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    if (gambar) {
      formData.append("gambar", gambar);
    }
    onSave(item.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Foto</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ganti Foto (Opsional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Judul
            </label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mb-4 w-full h-48 object-cover rounded"
            />
          )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GaleriFoto = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk modal edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchGaleri = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/galeri");
      setItems(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await apiClient.put(`/galeri/${id}`, formData);
      if (response.data.success) {
        alert("Foto berhasil diperbarui.");
        setIsModalOpen(false);
        fetchGaleri();
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      alert(`Gagal memperbarui: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus foto ini?")) {
      try {
        const response = await apiClient.delete(`/galeri/${id}`);
        if (response.data.success) {
          alert("Foto berhasil dihapus.");
          fetchGaleri();
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        alert(`Gagal menghapus: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  return (
    <div id="galeri-foto">
      {isModalOpen && editingItem && (
        <EditFotoModal
          item={editingItem}
          onCancel={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Galeri Foto</h2>
      {isLoading && <p className="text-center p-4">Memuat galeri...</p>}
      {error && <p className="text-center p-4 text-red-500">Error: {error}</p>}

      {!isLoading && !error && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          id="foto-grid"
        >
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="relative group bg-white rounded-lg shadow overflow-hidden"
              >
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col justify-between p-4">
                  <p className="text-white font-bold opacity-0 group-hover:opacity-100">
                    {item.judul}
                  </p>
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center p-4 text-gray-500">
              Galeri foto kosong.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GaleriFoto;
