import React, { useState, useEffect } from "react";
import axios from "axios";

// Instance Axios
const apiClient = axios.create({
  baseURL: "https://backend-pulosari.anugrahdamarishakim.workers.dev/api",
  withCredentials: true, // Untuk mengirim cookie otentikasi
});

// Komponen Modal Form untuk Edit
const EditBeritaModal = ({ beritaItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    judul: beritaItem.judul,
    isi: beritaItem.isi,
  });
  const [gambar, setGambar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    dataToSubmit.append("judul", formData.judul);
    dataToSubmit.append("isi", formData.isi);
    if (gambar) {
      dataToSubmit.append("gambar", gambar);
    }
    onSave(beritaItem.id, dataToSubmit);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4">Edit Berita</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="judul"
              className="block text-sm font-medium text-gray-700"
            >
              Judul
            </label>
            <input
              type="text"
              name="judul"
              id="judul"
              value={formData.judul}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="isi"
              className="block text-sm font-medium text-gray-700"
            >
              Konten
            </label>
            <textarea
              name="isi"
              id="isi"
              rows="5"
              value={formData.isi}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="gambar"
              className="block text-sm font-medium text-gray-700"
            >
              Ganti Gambar (Opsional)
            </label>
            <input
              type="file"
              name="gambar"
              id="gambar"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BeritaList = ({ refreshKey }) => {
  const [berita, setBerita] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk modal edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState(null);

  const fetchBerita = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/berita");
      if (response.data.success) {
        setBerita(response.data.data);
      } else {
        throw new Error(response.data.message || "Gagal mengambil data");
      }
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, [refreshKey]);

  const handleEdit = (beritaItem) => {
    setEditingBerita(beritaItem);
    setIsModalOpen(true);
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await apiClient.put(`/berita/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        alert("Berita berhasil diperbarui.");
        setIsModalOpen(false);
        setEditingBerita(null);
        fetchBerita(); // Refresh daftar berita
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      alert(`Gagal memperbarui berita: ${errorMessage}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus berita ini?")) {
      try {
        const response = await apiClient.delete(`/berita/${id}`); //
        if (response.data.success) {
          //
          alert("Berita berhasil dihapus."); //
          fetchBerita(); //
        } else {
          throw new Error(response.data.message); //
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message; //
        alert(`Gagal menghapus berita: ${errorMessage}`); //
      }
    }
  };

  return (
    <div id="berita-list">
      {isModalOpen && editingBerita && (
        <EditBeritaModal
          beritaItem={editingBerita}
          onSave={handleUpdate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingBerita(null);
          }}
        />
      )}
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Daftar Berita</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        {isLoading && <p>Memuat data...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!isLoading && !error && (
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-2 w-1/4">Gambar</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody id="user-table-body">
              {berita.length > 0 ? (
                berita.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {item.judul}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-600 hover:underline mr-4"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    Belum ada berita.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BeritaList;
