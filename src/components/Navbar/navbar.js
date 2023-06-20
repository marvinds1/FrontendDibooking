/* eslint-disable no-sequences */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Image } from 'react-bootstrap';
import logo from '../../assets/icons/logo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendEndpoint } from '../../backend';

function DNavbar() {
  const images = require('../../assets/images/profile.jpeg')
  const [isOutlineButtonHovered, setOutlineButtonHovered] = useState(false);
  const [isFillButtonHovered, setFillButtonHovered] = useState(false);

  const buttonOutline = {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#ff7315',
    width: '100%',
    height: '50px',
    border: '1px solid #ff7315',
    borderRadius: '0.3rem',
    boxShadow: '3px 3px 2px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease-in-out'
  };

  const buttonOutlineHover = {
    ...buttonOutline,
    boxShadow: '3px 3px 2px rgba(0, 0, 0, 0.2)'
  };

  const buttonFill = {
    fontWeight: 'bold',
    backgroundColor: '#ff7315',
    color: 'white',
    width: '100%',
    height: '50px',
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

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    saldo: "",
  });

  const fetchUser = async (token) => {
    const response = await fetch(`${backendEndpoint}/api/detail/profile`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    setUser({
      name: data.token.name,
      saldo: data.token.saldo,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchUser(token);
    }
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="d-flex flex-column m-0 p-0" style={{ boxShadow: "3px 3px 2px rgba(0, 0, 0, 0.1)" }}>
      <Container className="d-flex flex-row align-items-center mb-2 mt-2">
        <Navbar.Brand href="/#" className="d-flex align-items-center" style={{ fontSize: "20px", fontWeight: "bold" }}>
          <img src={logo} className="logo_navbar" alt="Logo Brand" width="90" height="50" />
          Dibooking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-lg-auto text-center gap-4">
            <Nav.Link href="/#promo">Promo</Nav.Link>
            <Nav.Link href="/#recommendation">Rekomendasi</Nav.Link>
            <Nav.Link href="/#category">Kategori</Nav.Link>
            <Nav.Link href="/about">Tentang Kami</Nav.Link>
          </Nav>
          {!loggedIn ? (
            <Nav className="ms-lg-auto gap-4">
              <Button href="/login" style={{...(isOutlineButtonHovered ? buttonOutlineHover : buttonOutline), display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}
                onMouseEnter={() => setOutlineButtonHovered(true)}
                onMouseLeave={() => setOutlineButtonHovered(false)}
              >Masuk</Button>
              <Button href="/register" style={{...(isFillButtonHovered ? buttonFillHover : buttonFill), display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}
                onMouseEnter={() => setFillButtonHovered(true)}
                onMouseLeave={() => setFillButtonHovered(false)}
              >Daftar</Button>
            </Nav>
          ) : (
            <Nav className="ms-lg-auto align-items-center">
            <NavDropdown
              align={{ xxxl: 'start' }}
              title={
                <span className="d-inline-flex align-items-center">
                  <span className="me-3">{user.name}</span>
                  <Image src={images} height={"40px"} width={"40px"} roundedCircle />
                </span>
              }
            >
              <NavDropdown.Item href="/saldo">Rp {user.saldo}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/user">Detail Akun</NavDropdown.Item>
              <NavDropdown.Item href="/booking">Pemesanan</NavDropdown.Item>
              <NavDropdown.Item href="/history">Riwayat Pemesanan</NavDropdown.Item>
              <NavDropdown.Item href="/notification">Notifikasi</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Keluar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DNavbar;