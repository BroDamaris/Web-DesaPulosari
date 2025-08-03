import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/index.css";

const KontakPage = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1 style={{ fontWeight: "bold" }}>Kontak Desa Pulosari</h1>
          <p>
            Hubungi Desa Pulosari untuk mendapatkan informasi lebih lanjut,
            memberikan masukan, atau menjalin komunikasi langsung dengan kami.
          </p>
        </div>
      </section>

      {/* Kontak Section */}
      <div className="background-wrapper">
        <div className="container-fluid kontak">
          <h2 style={{ fontWeight: "bold" }}>
            <u>Kontak Desa Pulosari</u>
          </h2>

          {/* WhatsApp */}
          <div className="kontak-item">
            <div>
              <h3>Whatsapp</h3>
              <p>
                Hubungi kami secara langsung melalui WhatsApp untuk mendapatkan
                informasi cepat dan pelayanan dari perangkat desa.
              </p>
              <Link
                to="http://wa.me/+6285882867625"
                className="btn btn-success"
              >
                Hubungi via Whatsapp
              </Link>
            </div>
            <div>
              <img src="assets/whatsapp.svg" alt="Whatsapp" />
            </div>
          </div>

          {/* Instagram */}
          <div className="kontak-item">
            <div>
              <h3>Instagram</h3>
              <p>
                Ikuti berbagai kegiatan dan informasi terbaru Desa Pulosari
                melalui akun Instagram resmi kami.
              </p>
              <Link to="#" className="btn btn-success">
                Lihat Instagram
              </Link>
            </div>
            <div>
              <img src="assets/instagram.svg" alt="Instagram" />
            </div>
          </div>

          {/* Facebook */}
          <div className="kontak-item">
            <div>
              <h3>Facebook</h3>
              <p>
                Kunjungi halaman Facebook Desa Pulosari untuk mendapatkan update
                berita dan pengumuman penting dari desa.
              </p>
              <Link to="#" className="btn btn-success">
                Kunjungi Facebook
              </Link>
            </div>
            <div>
              <img src="assets/facebook.svg" alt="Facebook" />
            </div>
          </div>

          {/* Email */}
          <div className="kontak-item">
            <div>
              <h3>Email</h3>
              <p>
                Kirimkan saran, pertanyaan, atau dokumen resmi Anda melalui
                email. Kami siap merespon dengan cepat.
              </p>
              <Link
                to="mailto:pulosari.pemdes.karawangkab@gmail.com"
                className="btn btn-success"
              >
                Kirim Email
              </Link>
            </div>
            <div>
              <img src="assets/gmail.svg" alt="Gmail" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KontakPage;
