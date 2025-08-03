import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/css/index.css"; // Pastikan file CSS ini diimpor

function BeritaDesaDetail() {
  const { id } = useParams(); // Mengambil 'id' dari parameter URL
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        setLoading(true);
        // Mengambil data dari endpoint API untuk detail berita
        const response = await fetch(
          `https://backend-pulosari.anugrahdamarishakim.workers.dev/api/berita/${id}`
        );
        const result = await response.json();

        if (result.success) {
          setBerita(result.data);
        } else {
          throw new Error(result.message || "Berita tidak ditemukan");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritaDetail();
  }, [id]); // Efek ini akan berjalan kembali jika 'id' berubah

  if (loading) {
    return (
      <div className="hero">
        <h1 className="fw-bold">Memuat Detail Berita...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero">
        <h1 className="fw-bold text-danger">Error: {error}</h1>
        <Link to="/berita" className="btn btn-success mt-3">
          Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  if (!berita) {
    return null; // Atau tampilkan pesan jika berita null setelah loading selesai
  }

  return (
    <>
      {/* Hero Section dengan Judul Berita */}
      <div className="hero">
        <div>
          <h1 className="fw-bold">Berita Desa Pulosari</h1>
          <p>Kumpulan berita dan informasi terkini seputar Desa Pulosari.</p>
        </div>
      </div>

      <div className="background-wrapper">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h2 className="produk-title">{berita.judul}</h2>
              <p className="produk-title">
                Dipublikasikan pada: {berita.tanggal}
              </p>
              <article>
                {/* Gambar Utama Berita */}
                <img
                  src={berita.gambar}
                  className="img-fluid rounded shadow-sm mb-4 w-100"
                  alt={berita.judul}
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />

                {/* Konten Isi Berita */}
                <div
                  className="berita-content"
                  style={{ textAlign: "justify", lineHeight: "1.8" }}
                >
                  {/* Memisahkan paragraf berdasarkan baris baru untuk keterbacaan */}
                  {berita.isi.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <hr className="my-5" />

                <div className="text-center">
                  <Link to="/berita-desa" className="btn btn-success">
                    &larr; Kembali ke Semua Berita
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BeritaDesaDetail;
