import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/index.css";

function PotensiAlamPage() {
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1 style={{ fontWeight: "bold" }}>Potensi Desa Pulosari</h1>
          <p>
            Desa Pulosari memiliki berbagai potensi unggulan di bidang
            pertanian, peternakan, dan wisata alam.
          </p>
        </div>
      </div>
      {/* Potensi Desa */}
      <div className="background-wrapper">
        <div className="potensi-desa">
          <h2>
            <u>Potensi Desa</u>
          </h2>
          <div className="section-content">
            <h4>Pengertian Potensi Desa</h4>
            <p>
              Potensi desa adalah segala sumber daya alam dan sumber daya
              manusia yang dimiliki oleh Desa Pulosari, Kecamatan Telagasari,
              Kabupaten Karawang. Potensi ini menjadi modal utama dalam
              pembangunan desa, baik dalam sektor ekonomi, lingkungan, maupun
              sosial budaya.
            </p>
            <p>
              Desa Pulosari memiliki kekayaan alam dan karakter masyarakat yang
              kuat, sehingga mampu mendukung pertumbuhan desa yang mandiri dan
              berkelanjutan.
            </p>
          </div>
          <hr />
          <div className="section-content">
            <h4>Potensi Pertanian</h4>
            <div className="image-container">
              <img
                src="assets/pertanian.jpg"
                alt="Pertanian Desa Pulosari"
                className="img-fluid"
              />
            </div>
            <p>
              Pertanian merupakan sektor penggerak utama perekonomian masyarakat
              Desa Pulosari. Dengan lahan sawah yang luas dan tanah yang subur,
              mayoritas penduduk menggantungkan hidup dari usaha
              pertanian—khususnya budidaya padi sebagai komoditas utama.
            </p>
            <p>
              Sistem pertanian di Pulosari masih mempertahankan nilai-nilai
              tradisional, seperti gotong royong dalam panen dan pengairan sawah
              melalui saluran irigasi teknis maupun setengah teknis. Selain
              padi, sebagian masyarakat juga menanam palawija sebagai tanaman
              sela.
            </p>
          </div>
          <hr />
          <div className="section-content">
            <h4>Potensi Peternakan</h4>
            <div className="image-container">
              <img
                src="assets/bebek.jpg"
                alt="Peternakan Desa Pulosari"
                className="img-fluid"
              />
            </div>
            <p>
              Selain pertanian, masyarakat Desa Pulosari juga mengembangkan
              sektor peternakan skala rumah tangga. Beberapa jenis ternak yang
              umum dipelihara adalah sapi, kambing, ayam kampung, dan bebek.
            </p>
            <p>
              Meskipun masih dikelola secara konvensional, peternakan di desa
              ini memberikan kontribusi terhadap pendapatan keluarga serta
              menjadi bagian dari kearifan lokal dalam pemanfaatan limbah
              pertanian sebagai pakan ternak.
            </p>
          </div>
          <hr />
          <div className="section-content">
            <h4>Potensi Wisata Alam</h4>
            <div className="image-container">
              <img
                src="assets/wisata-alam.jpg"
                alt="Wisata Alam Desa Pulosari"
                className="img-fluid"
              />
            </div>
            <p>
              Keindahan alam Desa Pulosari menyimpan potensi wisata yang
              menjanjikan, terutama dalam bentuk wisata pedesaan dan agrowisata.
              Hamparan sawah yang hijau, lanskap desa yang tenang, serta suasana
              yang masih alami menjadi daya tarik tersendiri bagi pengunjung
              yang ingin merasakan ketenangan khas perdesaan Karawang.
            </p>
            <p>
              Potensi ini dapat dikembangkan menjadi program wisata edukasi
              pertanian atau paket kunjungan berbasis budaya dan alam.
            </p>
          </div>
          <div className="footer-note">
            <p className="text-muted mb-0">
              <em>
                Catatan: Potensi UMKM dan produk lokal dapat dilihat pada
                halaman{" "}
                <strong>
                  <Link to="/produk-desa">Produk Desa</Link>
                </strong>
                .
              </em>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PotensiAlamPage;
