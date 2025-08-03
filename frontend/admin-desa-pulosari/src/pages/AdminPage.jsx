import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import apiClient from "../api/axios";
import "../assets/index.css"; // Import your CSS styles

// Import the new components
import DashboardContent from "../components/DashboardContent";
import BeritaList from "../components/BeritaList";
import TambahBerita from "../components/TambahBerita";
import GaleriFoto from "../components/GaleriFoto";
import TambahFoto from "../components/TambahFoto";
import UserManagement from "../components/UserManagement";

// Placeholder components for sections without provided HTML
const PlaceholderContent = ({ title }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>
    <p>Konten untuk {title} akan ditampilkan di sini.</p>
  </div>
);

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, checkAuthStatus } = useAuth();

  const [activeView, setActiveView] = useState("dashboard");
  const [openDropdown, setOpenDropdown] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await apiClient.delete("api/auth/logout");
    await checkAuthStatus();
    navigate("/login");
  };

  const handleToggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? "" : dropdownId);
  };

  const handleShowSection = (viewId) => {
    setActiveView(viewId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardContent />;
      case "berita-list":
        return <BeritaList />;
      case "tambah-berita":
        return <TambahBerita />;
      case "galeri-foto":
        return <GaleriFoto />;
      case "tambah-foto":
        return <TambahFoto />;
      case "users":
        return <UserManagement />;
      case "sejarah":
        return <PlaceholderContent title="Sejarah Desa" />;
      case "statistik":
        return <PlaceholderContent title="Statistik Desa" />;
      case "kependudukan":
        return <PlaceholderContent title="Data Kependudukan" />;
      case "pemerintahan":
        return <PlaceholderContent title="Pemerintahan Desa" />;
      case "potensi":
        return <PlaceholderContent title="Potensi Desa" />;
      case "umkm":
        return <PlaceholderContent title="UMKM Desa" />;
      default:
        return <DashboardContent />;
    }
  };

  const NavButton = ({
    viewId,
    title,
    iconClass,
    hasSubmenu = false,
    dropdownId = "",
  }) => (
    <button
      onClick={() =>
        hasSubmenu
          ? handleToggleDropdown(dropdownId)
          : handleShowSection(viewId)
      }
      className={`nav-btn w-full flex items-center px-4 py-3 text-left rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 group ${
        !hasSubmenu && activeView === viewId ? "active" : ""
      }`}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-lg group-hover:bg-opacity-20 transition-all duration-300 mr-3">
        <i
          className={`${iconClass} text-green-300 group-hover:text-white transition-colors duration-300`}
        ></i>
      </div>
      <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
        {title}
      </span>
      <div className="ml-auto">
        {hasSubmenu && (
          <i
            className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
              openDropdown === dropdownId ? "rotate-180" : ""
            }`}
          ></i>
        )}
      </div>
    </button>
  );

  const SubNavButton = ({ viewId, title, iconClass }) => (
    <button
      onClick={() => handleShowSection(viewId)}
      className={`w-full flex items-center px-4 py-2 text-left text-sm hover:text-white hover:bg-white hover:bg-opacity-5 rounded-lg transition-all duration-200 group ${
        activeView === viewId ? "text-white font-semibold" : "text-green-200"
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center mr-3">
        <i
          className={`${iconClass} text-xs group-hover:scale-110 transition-transform duration-200`}
        ></i>
      </div>
      {title}
    </button>
  );

  return (
    <div className="bg-gray-100 min-h-screen font-inter">
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-green text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out z-50 shadow-2xl flex flex-col`}
      >
        {/* Header Section */}
        <div className="glass-effect p-6 border-b border-green-500 border-opacity-30">
          <div className="flex items-center space-x-3 relative z-10">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg pulse-animation">
                <i className="fas fa-leaf text-white text-xl"></i>
              </div>
            </div>
            <div>
              <h2 className="font-poppins font-bold text-lg bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-green-200 text-sm">Desa Pulosari</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-4">
          <ul className="space-y-1 px-3">
            <li>
              <NavButton
                viewId="dashboard"
                title="Dashboard"
                iconClass="fas fa-tachometer-alt"
              />
            </li>

            {/* Kelola Berita */}
            <li>
              <NavButton
                title="Kelola Berita"
                iconClass="fas fa-newspaper"
                hasSubmenu={true}
                dropdownId="berita"
              />
              {openDropdown === "berita" && (
                <ul className="ml-6 mt-2 space-y-1 dropdown-open">
                  <li>
                    <SubNavButton
                      viewId="berita-list"
                      title="Daftar Berita"
                      iconClass="fas fa-list"
                    />
                  </li>
                  <li>
                    <SubNavButton
                      viewId="tambah-berita"
                      title="Tambah Berita"
                      iconClass="fas fa-plus"
                    />
                  </li>
                </ul>
              )}
            </li>

            {/* Kelola Galeri */}
            <li>
              <NavButton
                title="Kelola Galeri"
                iconClass="fas fa-images"
                hasSubmenu={true}
                dropdownId="galeri"
              />
              {openDropdown === "galeri" && (
                <ul className="ml-6 mt-2 space-y-1 dropdown-open">
                  <li>
                    <SubNavButton
                      viewId="galeri-foto"
                      title="Galeri Foto"
                      iconClass="fas fa-photo-video"
                    />
                  </li>
                  <li>
                    <SubNavButton
                      viewId="tambah-foto"
                      title="Tambah Foto"
                      iconClass="fas fa-upload"
                    />
                  </li>
                </ul>
              )}
            </li>

            {/* Profil Desa */}
            <li>
              <NavButton
                title="Profil Desa"
                iconClass="fas fa-info-circle"
                hasSubmenu={true}
                dropdownId="profil"
              />
              {openDropdown === "profil" && (
                <ul className="ml-6 mt-2 space-y-1 dropdown-open">
                  <li>
                    <SubNavButton
                      viewId="sejarah"
                      title="Sejarah Desa"
                      iconClass="fas fa-history"
                    />
                  </li>
                  <li>
                    <SubNavButton
                      viewId="statistik"
                      title="Statistik"
                      iconClass="fas fa-chart-bar"
                    />
                  </li>
                  <li>
                    <SubNavButton
                      viewId="kependudukan"
                      title="Kependudukan"
                      iconClass="fas fa-users"
                    />
                  </li>
                  <li>
                    <SubNavButton
                      viewId="pemerintahan"
                      title="Pemerintahan Desa"
                      iconClass="fas fa-building"
                    />
                  </li>
                  <li>
                    <SubNavButton
                      viewId="potensi"
                      title="Potensi Desa"
                      iconClass="fas fa-seedling"
                    />
                  </li>
                  <li>
                    <SubNavButton
                      viewId="umkm"
                      title="UMKM Desa"
                      iconClass="fas fa-store"
                    />
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavButton
                viewId="users"
                title="Pengguna"
                iconClass="fas fa-users"
              />
            </li>
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 mt-auto border-t border-green-500 border-opacity-30">
          <div className="glass-effect rounded-xl p-3 mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center floating-animation">
                <i className="fas fa-user-shield text-white text-sm"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user ? user.nama_lengkap : "Admin"}
                </p>
                <p className="text-xs text-green-200">Online</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 group transform hover:scale-105 shadow-lg"
          >
            <i className="fas fa-sign-out-alt text-white text-sm mr-3"></i>
            <span className="font-medium text-white">Keluar</span>
          </button>
        </div>
      </div>

      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-green-600 text-white p-3 rounded-xl shadow-lg hover:bg-green-700 transition-colors duration-300"
      >
        <i className="fas fa-bars"></i>
      </button>

      <main className="lg:ml-64 min-h-screen bg-gray-50 transition-all duration-300 ease-in-out">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[calc(100vh-4rem)]">
            {renderActiveView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
