import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/index.css"; // Pastikan file CSS ini diimpor

function BeritaDesaPage() {
  const [daftarBerita, setDaftarBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const beritaPerPage = 6;

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        // Ganti dengan URL endpoint API Anda
        const response = await fetch(
          "https://backend-pulosari.anugrahdamarishakim.workers.dev/api/berita"
        );
        const result = await response.json();
        if (result.success) {
          // Mengurutkan berita dari yang terbaru berdasarkan ID
          setDaftarBerita(result.data.sort((a, b) => b.id - a.id));
        } else {
          throw new Error(result.message || "Gagal mengambil data berita");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  // Fungsi untuk membatasi teks (excerpt)
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  // Logika untuk paginasi
  const indexOfLastBerita = currentPage * beritaPerPage;
  const indexOfFirstBerita = indexOfLastBerita - beritaPerPage;
  const currentBerita = daftarBerita.slice(
    indexOfFirstBerita,
    indexOfLastBerita
  );
  const totalPages = Math.ceil(daftarBerita.length / beritaPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="hero">
        <h1 className="fw-bold">Memuat Berita...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero">
        <h1 className="fw-bold text-danger">Error: {error}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="hero">
        <div>
          <h1 className="fw-bold">Berita Desa Pulosari</h1>
          <p>Kumpulan berita dan informasi terkini seputar Desa Pulosari.</p>
        </div>
      </div>

      <div className="background-wrapper">
        <section className="section-berita py-5">
          <div className="container">
            <h2 className="produk-title">
              <u>Semua Berita</u>
            </h2>
            <div className="row g-4">
              {currentBerita.map((berita) => (
                <div className="col-lg-4 col-md-6 mb-4" key={berita.id}>
                  <div className="card h-100">
                    <img
                      src={berita.gambar} // Menggunakan URL gambar dari API
                      className="card-img-top"
                      alt={berita.judul}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{berita.judul}</h5>
                      <p className="text-muted mb-2">
                        Dipublikasikan: {berita.tanggal}
                      </p>
                      {/* Menggunakan 'isi' dari API dan membatasinya */}
                      <p className="card-text">
                        {truncateText(berita.isi, 20)}
                      </p>
                      <Link
                        to={`/berita-desa/${berita.id}`} // Link dinamis ke detail berita
                        className="btn btn-success mt-auto"
                      >
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginasi Dinamis */}
            {totalPages > 1 && (
              <nav aria-label="Page navigation example" className="mt-5">
                <ul className="pagination justify-content-center pagination-success">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Sebelumnya
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((number) => (
                    <li
                      key={number + 1}
                      className={`page-item ${
                        currentPage === number + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(number + 1)}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Berikutnya
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default BeritaDesaPage;
