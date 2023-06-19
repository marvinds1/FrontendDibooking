import React, { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import DNavbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import "./about.css"
import sportFamily from "../../assets/images/sport-family.png";
import layananSewaLapangan from "../../assets/images/layanan-sewa-lapangan.png";
import layananKelolaLapangan from "../../assets/images/layanan-kelola-lapangan.png";
import layananCariLapangan from "../../assets/images/layanan-cari-lapangan.png";
import phone from "../../assets/images/phone.png";
import rifqi from "../../assets/images/rifqi.jpg"
import fadhil from "../../assets/images/fadhil.jpg"
import rizqi from "../../assets/images/rizqi.JPG"
import rizki from "../../assets/images/rizki.jpg"

function About() {
  const [isFillButtonHovered, setFillButtonHovered] = useState(false);
  const [isOutlineButtonHovered, setOutlineButtonHovered] = useState(false);

  const buttonFill = {
    fontWeight: 'bold',
    backgroundColor: '#ff7315',
    color: 'white',
    width: '180px',
    height: '50px',
    marginTop: '1rem',
    border: 'none',
    borderRadius: '0.3rem',
    boxShadow: '3px 3px 2px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease-in-out'
  };

  const buttonFillHover = {
    ...buttonFill,
    backgroundColor: '#ff8f44',
    color: '#ffffff',
    boxShadow: '3px 3px 2px rgba(0, 0, 0, 0.2)'
  };

  const buttonOutline = {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#ff7315',
    width: '180px',
    height: '50px',
    marginTop: '1rem',
    border: '1px solid #ff7315',
    borderRadius: '0.3rem',
    boxShadow: '3px 3px 2px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease-in-out'
  };

  const buttonOutlineHover = {
    ...buttonOutline,
    boxShadow: '3px 3px 2px rgba(0, 0, 0, 0.2)'
  };

  return (
    <>
      <DNavbar />
      <Container className="py-5">
        <Row className="gx-0 mb-5" style={{ width: "100%", height: "70vh" }}>
          <Col md={6}>
            <div className="d-flex align-items-center h-100">
              <div>
                <h1 className="mb-3" style={{ fontWeight: '700' }}>Selamat datang di <span style={{ fontWeight: '700', color: '#ff7315' }}>Dibooking</span></h1>
                <p className="mb-4">Dibooking merupakan Website untuk mempermudah dalam  Pemesanan serta Pengelolaan Lapangan Olahraga di Kota Semarang</p>
                <Button style={isFillButtonHovered ? buttonFillHover : buttonFill}
                  className="me-4"
                  onMouseEnter={() => setFillButtonHovered(true)}
                  onMouseLeave={() => setFillButtonHovered(false)}
                >Booking Sekarang</Button>
                <Button style={isOutlineButtonHovered ? buttonOutlineHover : buttonOutline}
                  onMouseEnter={() => setOutlineButtonHovered(true)}
                  onMouseLeave={() => setOutlineButtonHovered(false)}
                >Daftar Sekarang</Button>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="image d-flex justify-content-center align-items-center h-100">
              <Image src={sportFamily} width={"370px"} height={"370px"} style={{ padding: "30px" }} />
            </div>
          </Col>
        </Row >
        <Row className="gx-0 mt-5 mb-5">
          <h4 className="mt-5 mb-5 text-center" style={{ fontWeight: '700' }}>Layanan Kami</h4>
          <Col md={4} className="text-center">
            <div className="images-container">
              <Image src={layananSewaLapangan} width={"190px"} height={"190px"} style={{ padding: "30px" }} />
            </div>
            <p className="mb-4 text-center align-content-center" style={{ fontWeight: '700' }}>Sewa Lapangan</p>
          </Col>
          <Col md={4} className="text-center">
            <div className="images-container">
              <Image src={layananKelolaLapangan} width={"190px"} height={"190px"} style={{ padding: "30px" }} />
            </div>
            <p className="mb-4 text-center align-content-center" style={{ fontWeight: '700' }}>Kelola Lapangan</p>
          </Col>
          <Col md={4} className="text-center">
            <div className="images-container">
              <Image src={layananCariLapangan} width={"190px"} height={"190px"} style={{ padding: "30px" }} />
            </div>
            <p className="mb-4 text-center align-content-center" style={{ fontWeight: '700' }}>Cari Lapangan</p>
          </Col>
        </Row>
        <Row className="gx-0 mt-5 mb-5">
          <Col md={6}>
            <div className="image d-flex justify-content-center align-items-center h-100">
              <Image src={phone} width={"400px"} height={"400px"} style={{ padding: "50px" }} />
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center h-100">
              <div className="p-5">
                <h4 className="mb-2" style={{ fontWeight: '700' }}>Mengapa Menggunakan <span style={{ fontWeight: '700', color: '#ff7315' }}>Dibooking?</span></h4>
                <p className="mb-4">Bersama Dibooking sebagai platform mencari, menyewa dan mengelola yang aman dan praktis. Sebagai perantara antara penyewa dan pengelola yang lebih mudah.</p>
                <h4 className="mb-2" style={{ fontWeight: '700' }}>Pengelola Lapangan</h4>
                <p className="mb-4">Membantu anda untuk mengelola sekaligus memasarkan Lapangan Olahraga.</p>
                <h4 className="mb-2" style={{ fontWeight: '700' }}>Penyewa Lapangan?</h4>
                <p className="mb-4">Membantu anda untuk menemukan sekaligus menyewa Lapangan Olahraga.</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="gx-0 mt-5">
          <h4 className="mt-5 mb-5 text-center" style={{ fontWeight: '700' }}>Tim Pengembang</h4>
          <Col md={3} className="text-center">
            <div className="images-container">
              <Image src={rifqi} width={"190px"} height={"190px"} style={{ padding: "30px", objectFit: "cover" }} roundedCircle />
            </div>
            <p className="mb-0 text-center align-content-center" style={{ fontWeight: '700' }}>Rifqi Afwan</p>
            <p className="mb-4 text-center align-content-center" style={{ fontSize: '14px' }}>Back-End Engineer</p>
          </Col>
          <Col md={3} className="text-center">
            <div className="images-container">
              <Image src={fadhil} width={"190px"} height={"190px"} style={{ padding: "30px", objectFit: "cover" }} roundedCircle />
            </div>
            <p className="mb-0 text-center align-content-center" style={{ fontWeight: '700' }}>Fadhil Abyansyah</p>
            <p className="mb-4 text-center align-content-center" style={{ fontSize: '14px' }}>Front-End Developer</p>
          </Col>
          <Col md={3} className="text-center">
            <div className="images-container">
              <Image src={rizqi} width={"190px"} height={"190px"} style={{ padding: "30px", objectFit: "cover" }} roundedCircle />
            </div>
            <p className="mb-0 text-center align-content-center" style={{ fontWeight: '700' }}>Rizqi Akbar</p>
            <p className="mb-4 text-center align-content-center" style={{ fontSize: '14px' }}>Front-End Developer</p>
          </Col>
          <Col md={3} className="text-center">
            <div className="images-container">
              <Image src={rizki} width={"190px"} height={"190px"} style={{ padding: "30px", objectFit: "cover" }} roundedCircle />
            </div>
            <p className="mb-0 text-center align-content-center" style={{ fontWeight: '700' }}>Rizki Dwi</p>
            <p className="mb-4 text-center align-content-center" style={{ fontSize: '14px' }}>UI Designer</p>
          </Col>
        </Row>
      </Container >
      <Footer />
    </>
  );
}

export default About;