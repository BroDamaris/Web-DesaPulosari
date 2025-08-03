import React from "react";
import "../assets/css/index.css";
import "../assets/css/peta-desa.css"; // Assuming you have a CSS file for styling the map page

const PetaDesaPage = () => {
  return (
    <>
      <>
        <div className="hero">
          <div className="hero-text">
            <h1 style={{ fontWeight: "bold" }}>Peta Desa Pulosari</h1>
            <p>Temukan lokasi dan wilayah penting Desa Pulosari.</p>
          </div>
        </div>
        {/* Content Section */}
        <div className="background-wrapper">
          <section className="peta-section">
            <div className="container-fluid">
              <div className="peta-content">
                {/* Text Content */}
                <div className="peta-text">
                  <h2 style={{ fontWeight: "bold" }}>
                    <u>Peta Desa Pulosari</u>
                  </h2>
                  <p>
                    Desa Pulosari terletak di Kecamatan Telagasari, Kabupaten
                    Karawang, Jawa Barat. Dengan luas 252 hektare Desa ini
                    berbatasan dengan Desa Pagadungan Tempuran di sebelah utara,
                    Desa Ciwulan dan Desa Lemahabang di sebelah selatan, Desa
                    Lemahabang dan Desa Lemahmukti di sebelah timur, dan Desa
                    Ciwulan di Barat.
                  </p>
                </div>
                {/* Map Content */}
                <div className="peta-map">
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26109.953236507157!2d107.447915!3d-6.25464505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e697aec5b1f89d5%3A0x5176d09b0d6ccea1!2sPulosari%2C%20Kec.%20Talagasari%2C%20Karawang%2C%20Jawa%20Barat!5e1!3m2!1sid!2sid!4v1751818595603!5m2!1sid!2sid"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
              {/* Button Section */}
              <div className="peta-button">
                <a
                  href="https://www.google.com/maps/dir//Desa+Pulosari,+Telagasari,+Karawang"
                  target="_blank"
                  className="btn"
                >
                  Dapatkan Petunjuk Arah
                </a>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
};

export default PetaDesaPage;
