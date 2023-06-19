import React from "react";
import './footer.css';
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer-dibooking">
      <Container>
        <div className="dibooking-footer">
          <div className="dibooking-footer-links">
            <div className="dibooking-footer-links_div">
              <h3>Dibooking</h3>
              <span>Jl. Imam Bonjol No.207, Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131</span>
            </div>
            <div className="dibooking-footer-links_div">
              <h4>Produk Kami</h4>
              <Link to="#promo">
                <p>Promo</p>
              </Link>
              <Link to="#recommendation">
                <p>Rekomendasi Lapangan</p>
              </Link>
              <Link to="#category">
                <p>Kategori Lapangan</p>
              </Link>
            </div>
            <div className="dibooking-footer-links_div">
              <h4>Jelajahi kami</h4>
              <Link to="/about">
                <p>Tentang Kami</p>
              </Link>
              <Link to="/privacy">
                <p>Privasi</p>
              </Link>
              <Link to="/terms">
                <p>Syarat & Ketentuan</p>
              </Link>
            </div>
            <div className="dibooking-footer-links_div">
              <h4>Kontak Kami</h4>
              <Link to="mailto:bantuan@dibooking.com" target="_blank" rel="noopener noreferrer">
                <p>bantuan@dibooking.com</p>
              </Link>
              <Link to="tel:+628211223344" target="_blank" rel="noopener noreferrer">
                <p>+62 821-1122-3344</p>
              </Link>
              <Link to="https://www.google.com/maps/search/?api=1&query=Jl.+Imam+Bonjol+No.207,+Pendrikan+Kidul,+Kec.+Semarang+Tengah,+Kota+Semarang,+Jawa+Tengah+50131" target="_blank" rel="noopener noreferrer">
                <p>Dibooking, Kota Semarang</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="dibooking-footer-below">
          <p>Copyright {new Date().getFullYear()} Seluruh Hak Cipta, Dibooking</p>
        </div>
      </Container >
    </div>
  )
}

export default Footer;