import React, { useState, useEffect } from "react";
import "../assets/css/index.css";

function GaleriDesaPage() {
  const [daftarGaleri, setDaftarGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const galeriPerPage = 9;

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        // Ganti dengan URL endpoint API Anda
        const response = await fetch(
          "https://backend-pulosari.anugrahdamarishakim.workers.dev/api/galeri"
        );
        const result = await response.json();

        if (result.success) {
          // Mengurutkan galeri dari yang terbaru berdasarkan ID
          setDaftarGaleri(result.data.sort((a, b) => b.id - a.id));
        } else {
          throw new Error(result.message || "Gagal mengambil data galeri");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  // Logika untuk paginasi
  const indexOfLastGaleri = currentPage * galeriPerPage;
  const indexOfFirstGaleri = indexOfLastGaleri - galeriPerPage;
  const currentGaleri = daftarGaleri.slice(
    indexOfFirstGaleri,
    indexOfLastGaleri
  );
  const totalPages = Math.ceil(daftarGaleri.length / galeriPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="hero">
        <h1 className="fw-bold">Memuat Galeri...</h1>
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
          <h1 className="fw-bold">Galeri Desa Pulosari</h1>
          <p>
            Dokumentasi kegiatan, keindahan alam, dan momen berharga di Desa
            Pulosari.
          </p>
        </div>
      </div>

      <div className="background-wrapper">
        <section className="section-galeri py-5">
          <div className="container">
            <h2 className="produk-title">
              <u>Koleksi Galeri</u>
            </h2>
            <div className="row g-4">
              {currentGaleri.map((galeri) => (
                <div className="col-lg-4 col-md-6 mb-4" key={galeri.id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={galeri.gambar} // Menggunakan URL gambar dari API
                      className="card-img-top"
                      alt={galeri.judul}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{galeri.judul}</h5>
                      <p className="card-text">
                        <small className="text-muted">
                          Diunggah: {galeri.tanggal}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginasi Dinamis */}
            {totalPages > 1 && (
              <nav aria-label="Page navigation" className="mt-5">
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

export default GaleriDesaPage;
