import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/index.css";

function HomePage() {
  const [berita, setBerita] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [error, setError] = useState(null);

  // Ganti dengan URL backend Anda
  const API_BASE_URL =
    "https://backend-pulosari.anugrahdamarishakim.workers.dev/api";

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/berita`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          // Mengurutkan berita dari yang terbaru (asumsi ID lebih besar = lebih baru)
          const sortedBerita = result.data.sort((a, b) => b.id - a.id);
          setBerita(sortedBerita);
        } else {
          throw new Error(result.message || "Gagal mengambil data berita");
        }
      } catch (e) {
        console.error("Error fetching berita:", e);
        setError("Tidak dapat memuat data berita.");
      }
    };

    const fetchGaleri = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/galeri`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          // Mengurutkan galeri dari yang terbaru
          const sortedGaleri = result.data.sort((a, b) => b.id - a.id);
          setGaleri(sortedGaleri);
        } else {
          throw new Error(result.message || "Gagal mengambil data galeri");
        }
      } catch (e) {
        console.error("Error fetching galeri:", e);
        setError("Tidak dapat memuat data galeri.");
      }
    };

    fetchBerita();
    fetchGaleri();
  }, []);

  // Fungsi untuk membatasi teks berdasarkan jumlah kata
  const truncateTextByWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      <section className="hero-home">
        <div className="hero-home-text">
          <h1 style={{ fontWeight: "strong" }}>
            Selamat Datang di Desa Pulosari
          </h1>
          <p>
            Temukan informasi terkini tentang desa kami, layanan publik, dan
            berita terbaru.
          </p>
          <Link to="/kontak" className="btn btn-primary">
            Hubungi Kami
          </Link>
        </div>
      </section>

      <section className="intro">
        {/* ... bagian intro tidak berubah ... */}
      </section>

      <section className="berita">
        <div className="berita-text">
          <h2 style={{ fontWeight: "strong" }}>
            <u>Berita Terkini</u>
          </h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            {error && <p className="text-danger text-center">{error}</p>}
            {/* 1. Pembatasan Jumlah Berita: .slice(0, 3) */}
            {berita.length > 0
              ? berita.slice(0, 3).map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100">
                      <img
                        src={item.gambar}
                        className="card-img-top"
                        alt={item.judul}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item.judul}</h5>
                        <p className="text-muted mb-2">
                          Dipublikasikan: {item.tanggal}
                        </p>
                        <p className="card-text">
                          {/* 2. Pembatasan Isi Berita: 20 kata */}
                          {truncateTextByWords(item.isi, 20)}
                        </p>
                        <Link
                          to={`/berita-desa/${item.id}`}
                          className="btn btn-success mt-auto"
                        >
                          Baca Selengkapnya
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : !error && <p className="text-center">Memuat berita...</p>}
          </div>
        </div>
      </section>

      <section className="galeri">
        <div className="galeri-text">
          <h2 style={{ fontWeight: "strong" }}>
            <u>Galeri Desa</u>
          </h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* 1. Pembatasan Jumlah Galeri: .slice(0, 3) */}
            {galeri.length > 0
              ? galeri.slice(0, 3).map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100">
                      <img
                        src={item.gambar}
                        className="card-img-top"
                        alt={item.judul}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.judul}</h5>
                        <p className="card-text">
                          <small className="text-muted">
                            Diunggah: {item.tanggal}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : !error && <p className="text-center">Memuat galeri...</p>}
          </div>
        </div>
        <div className="text-center my-4">
          <Link to="/galeri-desa" className="btn btn-success">
            Selengkapnya
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
