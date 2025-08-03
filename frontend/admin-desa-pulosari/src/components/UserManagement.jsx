import React, { useState, useEffect } from "react";
import axios from "axios";

// Buat instance axios dengan baseURL untuk request yang lebih bersih
// Asumsikan semua endpoint API Anda berada di bawah /api
const apiClient = axios.create({
  baseURL: "https://backend-pulosari.anugrahdamarishakim.workers.dev/api",
  withCredentials: true, // Untuk mengirim cookie otentikasi
});

// Komponen UserForm tidak perlu diubah karena hanya menangani state form.
const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nama: user ? user.nama : "",
    username: user ? user.username : "",
    password: "",
    confPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {user ? "Edit User" : "Tambah User Baru"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password {user ? "(Kosongkan jika tidak ingin mengubah)" : ""}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confPassword"
              value={formData.confPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Axios secara otomatis mengembalikan data dalam format JSON di 'response.data'
      const response = await apiClient.get("/users");
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
      setError(null);
    } catch (err) {
      // Axios melemparkan error untuk status 4xx/5xx, membuatnya lebih mudah ditangkap
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error("Failed to fetch users:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pengguna ini?")) {
      try {
        const response = await apiClient.delete(`/users/${id}`);
        if (response.data.success) {
          alert("User berhasil dihapus.");
          fetchUsers(); // Refresh user list
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        alert(`Gagal menghapus user: ${errorMessage}`);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      let response;
      if (editingUser) {
        // Mengirim request PUT untuk update
        response = await apiClient.patch(`/users/${editingUser.id}`, formData);
      } else {
        // Mengirim request POST untuk membuat user baru
        response = await apiClient.post("/users", formData);
      }

      if (response.data.success) {
        alert(response.data.message);
        setIsModalOpen(false);
        fetchUsers(); // Refresh list
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      alert(`Error: ${errorMessage}`);
    }
  };

  // JSX untuk render komponen tidak berubah
  return (
    <div id="users">
      {isModalOpen && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Manajemen Pengguna</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>Tambah User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!isLoading && !error && (
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody id="user-table-body">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{user.nama}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(user.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
