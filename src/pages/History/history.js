/* eslint-disable array-callback-return */
import React from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import iconProfileBox from "../../assets/icons/ic_profile_box.png";
import DNavbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalTambahRev from "../../components/AddReview/addReview";
import { backendEndpoint } from "../../backend";

function History() {
  const [modalRev, setModalRev] = useState(false);
  const [Pemesanan, setPemesanan] = useState([]);
  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (!loggedIn) {
      window.location.href = "/login";
    }
    async function fetchData() {
      const response = await axios.get(`${backendEndpoint}/api/pemesanan/pesanans`,
        {
          headers: {
            Authorization: `${loggedIn}`,
          },
        }
      );
      response.data = response.data.filter((data) => data.status === 'Selesai' || data.status === 'Dibatalkan');
      setPemesanan(response.data);
    }
    fetchData();
  }, []);

  const dataPesanan = [];
  Pemesanan.map((dataPemesanan1) => {
    let statusColor;
    let statusText;
  
    switch (dataPemesanan1.status) {
      case "Menunggu Pembayaran":
        statusColor = "#FF0000";
        statusText = "Belum dibayar";
        break;
      case "Menunggu Konfirmasi":
        statusColor = "#FFBD15";
        statusText = "Menunggu Konfirmasi";
        break;
      case "Dikonfirmasi":
        statusColor = "#43C914";
        statusText = "Dikonfirmasi";
        break;
      case "Dibatalkan":
        statusColor = "#000000";
        statusText = "Dibatalkan";
        break;
      case "Selesai":
        statusColor = "#FFBD15";
        statusText = "Selesai";
        break;
      default:
        statusColor = "#000000";
        statusText = "Status Tidak Valid";
    }
    const dataPemesanan = {
      idField: dataPemesanan1.idField,
      namaManajemen: dataPemesanan1.manager,
      namaLapangan: dataPemesanan1.title,
      statusPemesanan: dataPemesanan1.status,
      tanggalPemesanan: dataPemesanan1.tanggal,
      jamPemesanan: dataPemesanan1.jam,
      hargaSewa: dataPemesanan1.price,
      nomor_ponsel: `https://wa.me/${dataPemesanan1.nomor_ponsel}`,
      totalPembayaran: dataPemesanan1.total,
      statusColor: statusColor,
      statusText: statusText,
    };
    dataPesanan.push(dataPemesanan);
  });

  const [isFillButtonHovered, setFillButtonHovered] = React.useState(false);
  const [isOutlineButtonHovered, setOutlineButtonHovered] = React.useState(false);

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
      {dataPesanan.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <p style={{ fontSize: "20px", fontWeight: "700" }}>Tidak ada riwayat pemesanan</p>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h1 style={{ fontWeight: "700" }}>Riwayat Pemesanan</h1>
          </div>
        </div>
      )}
      {dataPesanan.map((dataPemesanan, index) => (
        <div key={index} className="mb-5" style={{ height: "fit-content", overflow: "hidden", margin: "auto" }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <p>
                <span style={{ fontWeight: "700" }}>{dataPemesanan.namaManajemen}</span> |{" "}
              </p>
            </div>
            <p className="p-1" style={{ fontSize: "12px", border: `1px solid ${dataPemesanan.statusColor}`, color: dataPemesanan.statusColor }}>{dataPemesanan.statusText}</p>
          </div>
          <div className="mb-2" style={{ display: "flex", height: "fit-content", overflow: "hidden", margin: "auto", borderBottom: "1px solid black", paddingBottom: "10px" }}>
            <Image src={iconProfileBox} alt="Profile Box" style={{ height: "60px", width: "75px" }} />
            <div className="content" style={{ alignItems: "center" }}>
              <p className="mb-1" style={{ marginLeft: "10px", fontWeight: "700", fontSize: "12px" }}>{dataPemesanan.namaLapangan}</p>
              <p className="mb-0" style={{ marginLeft: "10px", color: "#666666", fontSize: "12px" }}>Waktu : {dataPemesanan.tanggalPemesanan} | {dataPemesanan.jamPemesanan}</p>
              <p className="mb-0" style={{ marginLeft: "10px", color: "#666666", fontSize: "12px" }}>Harga : {dataPemesanan.hargaSewa}</p>
            </div>
          </div>
          <p className="d-flex justify-content-between align-content-center" style={{ fontWeight: "500" }}>Total Harga{" "}<span>{dataPemesanan.totalPembayaran}</span></p>
          {(dataPemesanan.statusText === "Selesai" )?(
                  <><ModalTambahRev
              show={modalRev}
              onHide={() => setModalRev(false)}
              title={"Tambah Lapangan"} idField={dataPemesanan.idField} /><div className="d-flex align-content-end flex-wrap" style={{ flexDirection: "column" }}>
                <Form className="d-flex justify-content-center align-content-end py-1">
                  <Button onClick={() => { setModalRev(true); } } style={{ ...(isOutlineButtonHovered ? buttonOutlineHover : buttonOutline), display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                    className="me-4"
                    onMouseEnter={() => setOutlineButtonHovered(true)}
                    onMouseLeave={() => setOutlineButtonHovered(false)}
                  >Beri Ulasan</Button>
                  <Button href={dataPemesanan.nomor_ponsel} target="_blank" style={{ ...(isFillButtonHovered ? buttonFillHover : buttonFill), display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                    onMouseEnter={() => setFillButtonHovered(true)}
                    onMouseLeave={() => setFillButtonHovered(false)}
                  >Hubungi Pengelola</Button>
                </Form>
              </div></>
          ):(
            <></>
          )}
        </div>
      ))}
      </Container >
      <Footer />
    </>
  );
}

export default History;