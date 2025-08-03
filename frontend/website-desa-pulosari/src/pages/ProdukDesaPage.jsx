import React from "react";
import "../assets/css/index.css";

function PotensiDesaPage() {
  return (
    <>
      <div className="hero">
        <div>
          <h1 className="fw-bold">Produk Desa Pulosari</h1>
          <p>
            Berbagai hasil UMKM dan kerajinan tangan dari warga Desa Pulosari
          </p>
        </div>
      </div>
      {/* Background Wrapper */}
      <div className="background-wrapper">
        {/* Produk Section */}
        <section className="section-produk">
          <div className="container">
            <h2 className="produk-title">
              <u>Produk Lokal Unggulan</u>
            </h2>
            <div className="row g-4">
              {/* Produk 1 */}
              <div className="col-md-4">
                <div className="card produk-card">
                  <img
                    src="assets/produk1.jpeg"
                    className="card-img-top"
                    alt="Keripik Singkong"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Keripik Singkong Pedas</h5>
                    <p className="card-text">
                      Keripik singkong renyah dengan bumbu khas Pulosari, cocok
                      untuk camilan keluarga.
                    </p>
                  </div>
                </div>
              </div>
              {/* Produk 2 */}
              <div className="col-md-4">
                <div className="card produk-card">
                  <img
                    src="assets/produk2.jpeg"
                    className="card-img-top"
                    alt="Kerajinan Bambu"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Kerajinan Bambu</h5>
                    <p className="card-text">
                      Produk kerajinan tangan dari bambu seperti tempat nasi,
                      tudung saji, dan hiasan rumah.
                    </p>
                  </div>
                </div>
              </div>
              {/* Produk 3 */}
              <div className="col-md-4">
                <div className="card produk-card">
                  <img
                    src="assets/produk3.jpeg"
                    className="card-img-top"
                    alt="Manisan Pepaya"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Manisan Pepaya</h5>
                    <p className="card-text">
                      Olahan buah pepaya menjadi manisan segar dengan rasa manis
                      alami tanpa bahan pengawet.
                    </p>
                  </div>
                </div>
              </div>
              {/* Tambah produk lainnya di sini */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PotensiDesaPage;
