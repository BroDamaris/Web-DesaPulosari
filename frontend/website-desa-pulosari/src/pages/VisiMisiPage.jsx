import React from "react";
import "../assets/css/index.css";

function VisiMisiPage() {
  return (
    <>
      <nav className="hero">
        <nav className="hero-text">
          <h1 style={{ fontWeight: "bold" }}>Visi dan Misi Desa Pulosari</h1>
          <p>Menjadi pedoman dalam mewujudkan pembangunan desa.</p>
        </nav>
      </nav>
      <nav className="background-wrapper">
        <nav className="visi-misi">
          <nav className="visi-text">
            <h2 style={{ fontWeight: "bold" }}>
              <u>Visi Desa Pulosari</u>
            </h2>
            <p>
              Terwujudnya masyarakat Desa Pulosari yang Bersih, Relegius,
              Sejahtera, Rapi dan Indah melalui Akselerasi Pembangunan yang
              berbasis Keagamaan, Budaya Hukum dan Berwawasan Lingkungan dengan
              berorentasi pada peningkatan Kinerja Aparatur dan Pemberdayaan
              Masyarakat.
            </p>
          </nav>
          <hr
            style={{
              border: "1px solid #184f28",
              width: "80%",
              margin: "40px auto",
            }}
          />
          <section className="misi-section d-flex align-items-center justify-content-between p-5">
            {/* Gambar Kiri */}
            <div className="misi-image">
              <img
                src="assets/logo-desa2-bgremove-Photoroom.jpg"
                alt="Gambar Misi Desa"
                style={{ width: 400, borderRadius: 15 }}
              />
            </div>
            {/* Accordion Kanan */}
            <div
              className="accordion misi-accordion"
              id="accordionMisi"
              style={{ width: "60%" }}
            >
              <h2 className="mb-4 text-center" style={{ color: "#184f28" }}>
                <u>Misi Desa Pulosari</u>
              </h2>
              <div className="accordion-item">
                <h2 className="accordion-header" id="misi1">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="true"
                    aria-controls="collapse1"
                  >
                    1. Lingkungan Desa Bersih, Rapi, dan Indah
                  </button>
                </h2>
                <div
                  id="collapse1"
                  className="accordion-collapse collapse show"
                  aria-labelledby="misi1"
                  data-bs-parent="#accordionMisi"
                >
                  <div className="accordion-body">
                    Melalui program kebersihan rutin, penghijauan, dan
                    pengelolaan sampah yang terintegrasi.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="misi2">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse2"
                    aria-expanded="false"
                    aria-controls="collapse2"
                  >
                    2. Masyarakat Religius
                  </button>
                </h2>
                <div
                  id="collapse2"
                  className="accordion-collapse collapse"
                  aria-labelledby="misi2"
                  data-bs-parent="#accordionMisi"
                >
                  <div className="accordion-body">
                    Meningkatkan kegiatan keagamaan dan membina kerukunan
                    antarwarga.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="misi3">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3"
                  >
                    3. Meningkatkan kesejahteraan masyarakat
                  </button>
                </h2>
                <div
                  id="collapse3"
                  className="accordion-collapse collapse"
                  aria-labelledby="misi3"
                  data-bs-parent="#accordionMisi"
                >
                  <div className="accordion-body">
                    Dengan mendorong pertumbuhan ekonomi desa melalui
                    pemberdayaan UMKM, pertanian, dan potensi lokal.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="misi4">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="false"
                    aria-controls="collapse4"
                  >
                    4. Mendorong budaya hukum yang kuat
                  </button>
                </h2>
                <div
                  id="collapse4"
                  className="accordion-collapse collapse"
                  aria-labelledby="misi4"
                  data-bs-parent="#accordionMisi"
                >
                  <div className="accordion-body">
                    Dengan meningkatkan kesadaran dan ketaatan masyarakat
                    terhadap peraturan yang berlaku.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="misi5">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    5. Mewujudkan desa yang berwawasan lingkungan
                  </button>
                </h2>
                <div
                  id="collapse5"
                  className="accordion-collapse collapse"
                  aria-labelledby="misi5"
                  data-bs-parent="#accordionMisi"
                >
                  <div className="accordion-body">
                    Melalui edukasi dan penerapan pola hidup ramah lingkungan di
                    seluruh lapisan masyarakat.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="misi6">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse6"
                    aria-expanded="false"
                    aria-controls="collapse6"
                  >
                    6. Meningkatkan kinerja aparatur desa
                  </button>
                </h2>
                <div
                  id="collapse6"
                  className="accordion-collapse collapse"
                  aria-labelledby="misi6"
                  data-bs-parent="#accordionMisi"
                >
                  <div className="accordion-body">
                    Dengan membangun tata kelola pemerintahan desa yang
                    profesional, transparan, dan akuntabel.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="misi7">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse7"
                    aria-expanded="false"
                    aria-controls="collapse7"
                  >
                    7. Memperkuat partisipasi dan pemberdayaan masyarakat
                  </button>
                </h2>
                <div
                  id="collapse7"
                  className="accordion-collapse collapse"
                  aria-labelledby="misi7"
                  data-bs-parent="#accordionMisi"
                >
                  <div className="accordion-body">
                    Dalam setiap aspek pembangunan desa untuk menciptakan rasa
                    memiliki dan tanggung jawab bersama.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </nav>
      </nav>
    </>
  );
}

export default VisiMisiPage;
