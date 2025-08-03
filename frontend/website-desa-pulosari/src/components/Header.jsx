import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/footer-navbar.css";
import "../assets/css/header.css";

const Header = () => {
  return (
    <nav id="site-header" className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white fw-bold pt-2 d-flex flex-row align-items-center"
          to="/"
        >
          <img
            src="assets/logo-desa2-bgremove-Photoroom.jpg"
            alt="Logo Desa Pulosari"
            className="d-inline-block align-text-top mb-1"
            style={{ maxHeight: "60px" }}
          />
          <p className="mb-0">Desa Pulosari</p>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDesa"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarDesa">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-white pt-0"
                aria-current="page"
                to="/"
              >
                Beranda
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white pt-0"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Profil Desa
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <h6 className="dropdown-header">
                    <u>Profil Desa</u>
                  </h6>
                </li>
                <li>
                  <Link className="dropdown-item" to="visi-misi">
                    Visi Misi
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="peta-desa">
                    Peta Desa
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="sejarah">
                    Sejarah
                  </Link>
                </li>
                <li>
                  <h6 className="dropdown-header">
                    <u>Struktur Desa</u>
                  </h6>
                </li>
                <li>
                  <Link className="dropdown-item" to="perangkat-desa">
                    Perangkat Desa
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="struktur-organisasi">
                    Struktur Organisasi
                  </Link>
                </li>
                <li>
                  <h6 className="dropdown-header">
                    <u>Potensi Desa</u>
                  </h6>
                </li>
                <li>
                  <Link className="dropdown-item" to="potensi-alam">
                    Potensi Alam
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="produk-desa">
                    Produk Desa
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white pt-0"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Informasi
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <h6 className="dropdown-header">
                    <u>Informasi Desa</u>
                  </h6>
                </li>
                <li>
                  <Link className="dropdown-item" to="berita-desa">
                    Berita Desa
                  </Link>
                </li>
                {/* <li>
                  <Link className="dropdown-item" to="data-statistik">
                    Data Statistik
                  </Link>
                </li> */}
                <li>
                  <Link className="dropdown-item" to="galeri-desa">
                    Galeri Desa
                  </Link>
                </li>
                {/* <li>
                  <Link className="dropdown-item" to="umkm-desa">
                    UMKM Desa
                  </Link>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white pt-0" to="kontak">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        {/* Tombol Login Admin */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              href="https://admin-desa-pulosari.anugrahdamarishakim.workers.dev"
              className="btn btn-sm btn-outline-light me-3"
            >
              <i className="fas fa-lock"></i> Admin
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
