import React from "react";
import "../assets/css/index.css";

function StrukturOrganisasiPage() {
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1 style={{ fontWeight: "bold" }}>Struktur Organisasi</h1>
          <p>
            Struktur organisasi Desa Pulosari menggambarkan susunan jabatan dan
            tanggung jawab perangkat desa dalam menjalankan pemerintahan,
            pelayanan publik, serta pembangunan desa secara terpadu dan
            profesional.
          </p>
        </div>
      </div>
      {/* Struktur Organisasi */}
      <div className="background-wrapper">
        <div className="struktur-organisasi">
          <h2>
            <u>Struktur Organisasi</u>
          </h2>
          <div className="struktur-organisasi-image">
            <img
              src="assets/skema.png"
              alt="Skema Struktur Organisasi Desa Pulosari"
            />
          </div>
          <div className="struktur-organisasi-text-wrapper">
            <div className="struktur-organisasi-text">
              <p>
                Struktur organisasi Desa Pulosari disusun secara hierarkis untuk
                memastikan jalannya pemerintahan desa yang efektif dan efisien.
                Setiap jabatan memiliki tanggung jawab yang saling terintegrasi
                demi mewujudkan pelayanan publik yang optimal.
              </p>
              <ul>
                <li>
                  <strong>Kepala Desa</strong>: Pemimpin utama yang bertanggung
                  jawab atas seluruh kebijakan dan kegiatan pemerintahan desa.
                </li>
                <li>
                  <strong>Sekretaris Desa</strong>: Mengelola administrasi
                  pemerintahan, surat menyurat, dan laporan.
                </li>
                <li>
                  <strong>Kepala Urusan &amp; Seksi</strong>: Membantu
                  pelaksanaan tugas sesuai bidang masing-masing.
                </li>
                <li>
                  <strong>Kepala Dusun</strong>: Mengelola wilayah dusun dan
                  menjadi penghubung antara warga dan pemerintah desa.
                </li>
              </ul>
              <p>
                Dengan struktur ini, Desa Pulosari berkomitmen menciptakan
                pemerintahan desa yang transparan, partisipatif, dan
                berorientasi pada pelayanan masyarakat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StrukturOrganisasiPage;
