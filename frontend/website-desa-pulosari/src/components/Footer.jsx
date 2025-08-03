import React from "react";
import "../assets/css/footer-navbar.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-bg-color text-white pt-4 pb-2">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">Desa Pulosari</h5>
            <p>
              Dari Pulosari, kami membangun harapan, menjaga tradisi, dan
              melangkah bersama menuju masa depan yang lebih baik.
            </p>
            <li className="list-unstyled">
              <img
                src="/Image/WA.png"
                style={{
                  width: "26px",
                  height: "26px",
                  marginBottom: "6px",
                  marginRight: "7px",
                }}
                alt="WhatsApp Icon"
              />
              <a href="#" className="text-white text-decoration-none">
                WhatsApp : +6285882867625
              </a>
            </li>
            <li className="list-unstyled">
              <img
                src="/Image/mail.png"
                style={{
                  width: "26px",
                  height: "26px",
                  marginBottom: "6px",
                  marginRight: "7px",
                }}
                alt="Email Icon"
              />
              <a
                href="mailto:pulosari.pemdes.karawangkab@gmail.com"
                className="text-white text-decoration-none"
              >
                Email : @pulosari.pemdes.karawangkab@gmail.com
              </a>
            </li>
            <li className="list-unstyled">
              <img
                src="/Image/map.png"
                style={{
                  width: "26px",
                  height: "26px",
                  marginBottom: "6px",
                  marginRight: "7px",
                }}
                alt="Map Icon"
              />
              <a href="#" className="text-white text-decoration-none">
                Jalan Raya Pulosari No. 7, Desa Pulosari, Kecamatan Telagasari,
                Kabupaten Karawang, Provinsi Jawa Barat, Kode Pos 41382,
                Indonesia.
              </a>
            </li>
          </div>
          <div className="col-md-2 mb-3">
            <h5 className="fw-bold">Media Sosial</h5>
            <ul className="list-unstyled">
              <li>
                <img
                  src="/Image/face.png"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "7px",
                    marginBottom: "7px",
                  }}
                  alt="Facebook Icon"
                />
                <a href="#" className="text-white text-decoration-none">
                  @-
                </a>
              </li>
              <li>
                <img
                  src="/Image/instagram.png"
                  style={{
                    width: "26px",
                    height: "26px",
                    marginRight: "7px",
                    marginBottom: "7px",
                  }}
                  alt="Instagram Icon"
                />
                <a href="#" className="text-white text-decoration-none">
                  @-
                </a>
              </li>
              <li>
                <img
                  src="/Image/youtube.png"
                  style={{
                    width: "26px",
                    height: "26px",
                    marginRight: "7px",
                    marginBottom: "7px",
                  }}
                  alt="YouTube Icon"
                />
                <a href="#" className="text-white text-decoration-none">
                  @-
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h5 className="fw-bold">Tautan Cepat</h5>
            <Link
              to="/"
              className="text-white text-decoration-none d-block hover"
            >
              Beranda
            </Link>
            <Link
              to="/berita-desa"
              className="text-white text-decoration-none d-block hover"
            >
              Berita Desa
            </Link>
            <Link
              to="/galeri-desa"
              className="text-white text-decoration-none d-block hover"
            >
              Galeri Desa
            </Link>
            <Link
              to="/struktur-organisasi"
              className="text-white text-decoration-none d-block hover"
            >
              Struktur Organisasi
            </Link>
            <Link
              to="/perangkat-desa"
              className="text-white text-decoration-none d-block hover"
            >
              Perangkat Desa
            </Link>
            <Link
              to="/peta-desa"
              className="text-white text-decoration-none d-block hover"
            >
              Peta Desa
            </Link>
            <Link
              to="/potensi-alam"
              className="text-white text-decoration-none d-block hover"
            >
              Potensi Desa
            </Link>
          </div>
          <div className="col-md-5 mb-3">
            <h5 className="fw-bold">Lokasi Kami</h5>
            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30158.649425900825!2d107.4273153403134!3d-6.254644648956272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e697aec5b1f89d5%3A0x5176d09b0d6ccea1!2sPulosari%2C%20Kec.%20Talagasari%2C%20Karawang%2C%20Jawa%20Barat!5e1!3m2!1sid!2sid!4v1750020251642!5m2!1sid!2sid"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="text-center pt-3 pb-2 border-top mt-3">
          <p className="mb-0"> © 2025 Desa Pulosari. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
