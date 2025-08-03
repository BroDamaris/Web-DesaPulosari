import React from "react";
import "../assets/css/index.css";

function SejarahPage() {
  return (
    <>
      <>
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-text">
            <h1 style={{ fontWeight: "bold" }}>Sejarah Desa Pulosari</h1>
            <p>Sejarah panjang yang membentuk desa kami hari ini.</p>
          </div>
        </div>
        {/* Timeline Section */}
        <div className="background-wrapper">
          <h2 className="section-title" style={{ fontWeight: "bold" }}>
            <u>Perjalanan Sejarah Desa</u>
          </h2>
          <div className="timeline">
            {/* Timeline Item 1 */}
            <div className="timeline-item">
              <img src="assets/1970.jpeg" alt="Asal Usul Desa" />
              <div>
                <span className="highlight">1970-an</span>
                <p>
                  Awal mula Desa Pulosari berasal dari wilayah Desa Cilewo yang
                  dulunya mencakup empat desa yang sekarang sudah berdiri
                  sendiri. Wilayah ini dikenal sebagai daerah yang asri dan
                  subur.
                </p>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="timeline-item">
              <img src="assets/1986.jpeg" alt="Pemekaran Desa" />
              <div>
                <span className="highlight">1986</span>
                <p>
                  Desa Cilewo dimekarkan menjadi tiga desa yaitu Desa Pulosari,
                  Desa Ciwulan, dan Desa Pulosari (bagian timur). Pemekaran ini
                  dilakukan untuk mempercepat pembangunan desa dan meningkatkan
                  pelayanan kepada masyarakat.
                </p>
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <img src="assets/person-m.svg" alt="Kepala Desa Pertama" />
              <div>
                <span className="highlight">1989</span>
                <p>
                  M. Ocod terpilih menjadi kepala desa pertama yang memimpin
                  Desa Pulosari. Beliau menjabat sampai tahun 1989 dan membawa
                  banyak perubahan positif bagi masyarakat desa.
                </p>
              </div>
            </div>
            {/* Timeline Item 4 */}
            <div className="timeline-item">
              <img src="assets/1984.jpg" alt="Pusat Pemerintahan" />
              <div>
                <span className="highlight">1984</span>
                <p>
                  Pembangunan kantor desa baru di Kampung Pulogadung menjadi
                  pusat pemerintahan yang mempermudah pelayanan masyarakat.
                </p>
              </div>
            </div>
            {/* Timeline Item 5 */}
            <div className="timeline-item">
              <img
                src="assets/index_background.png"
                alt="Resmi Menjadi Desa Mandiri"
              />
              <div>
                <span className="highlight">1982</span>
                <p>
                  Dengan ditetapkannya Undang-Undang Nomor 5 Tahun 1979, Desa
                  Pulosari resmi menjadi desa mandiri pada 5 Juli 1982 dan terus
                  berkembang hingga saat ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default SejarahPage;
