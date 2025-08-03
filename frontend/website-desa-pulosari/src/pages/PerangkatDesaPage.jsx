import React from "react";
import "../assets/css/index.css";

function PotensiDesaPage() {
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1 style={{ fontWeight: "bold" }}>Perangkat Desa Pulosari</h1>
          <p>
            Perangkat Desa adalah pilar utama dalam pelaksanaan pemerintahan dan
            pelayanan publik di Desa Pulosari.
          </p>
        </div>
      </div>
      {/* Content Section */}
      <div className="background-wrapper">
        <div className="perangkat-desa container-fluid">
          <h2>
            <u>Perangkat Desa Pulosari</u>
          </h2>
          <div className="container">
            <div className="row justify-content-center g-4">
              {/* Kepala Dusun */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src="assets/person-m.svg"
                    alt="Kepala Dusun"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Kepala Dusun</h5>
                    <p className="card-text">Nama: H. Kana</p>
                    <p className="card-text">Kontak: -</p>
                  </div>
                </div>
              </div>
              {/* Kepala Urusan */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src="assets/person-m.svg"
                    alt="Kepala Urusan"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Kepala Urusan</h5>
                    <p className="card-text">Nama: Fulan</p>
                    <p className="card-text">Kontak: -</p>
                  </div>
                </div>
              </div>
              {/* Kepala Seksi */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src="assets/person-f.svg"
                    alt="Kepala Seksi"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Kepala Seksi</h5>
                    <p className="card-text">Nama: Fulan</p>
                    <p className="card-text">Kontak: -</p>
                  </div>
                </div>
              </div>
              {/* Sekretaris */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src="assets/person-f.svg"
                    alt="Sekretaris"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Sekretaris</h5>
                    <p className="card-text">Nama: Fulan</p>
                    <p className="card-text">Kontak: -</p>
                  </div>
                </div>
              </div>
              {/* BPD */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src="assets/person-m.svg"
                    alt="BPD"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">BPD</h5>
                    <p className="card-text">Nama: Fulan</p>
                    <p className="card-text">Kontak: -</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PotensiDesaPage;
