/* eslint-disable array-callback-return */
import React from "react";
import { Container, Image } from "react-bootstrap";
import { BiMessageDetail } from "react-icons/bi";
import iconProfileBox from "../../assets/icons/ic_profile_box.png";
import DNavbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendEndpoint } from "../../backend";

function Booking() {
  const navigate = useNavigate();
  const [Pemesanan, setPemesanan] = useState([]);
  async function fetchData(id) {
    const response = await axios.get(`${backendEndpoint}/api/pemesanan/pesanans`,
      {
        headers: {
          Authorization: `${id}`,
        },
      }
    );
    response.data = response.data.filter((data) => data.status === 'Menunggu Pembayaran' || data.status === 'Menunggu Konfirmasi' || data.status === 'Dikonfirmasi');
    setPemesanan(response.data);
  }
  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (!loggedIn) {
      window.location.href = "/login";
    }
    fetchData(loggedIn);
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
      id: dataPemesanan1.idPesanan,
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

  const formBayar = (id) => {
    navigate(`/payment/${id}`);
  };

  const formBatal = (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pesanan?");
    if (confirmDelete) {
      async function fetchData() {
        const response = await axios.put(`${backendEndpoint}/api/pemesanan/cancel/${id}`);
        if (response.status === 200) {
          window.location.reload();
        } else {
          alert("Gagal Membatalkan Pesanan");
        }
      }
      fetchData();
    }
  };
  

  return (
    <>
      <DNavbar />
      <Container className="py-5">
      {dataPesanan.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <p style={{ fontSize: "20px", fontWeight: "700" }}>Tidak ada pemesanan</p>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h1 style={{ fontWeight: "700" }}>Pemesanan</h1>
          </div>
        </div>
      )}
      {dataPesanan.map((dataPemesanan, index) => (
        <div key={index} className="mb-5" style={{ height: "fit-content", overflow: "hidden", margin: "auto" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <p>
                  <span style={{ fontWeight: "700" }}>{dataPemesanan.namaManajemen}</span> |{" "}
                  <a href={dataPemesanan.nomor_ponsel} target="_blank" rel="noopener noreferrer" style={{ display: "inline", alignItems: "center", textDecoration: "none" }}>
                    <BiMessageDetail style={{ color: "#FF7315" }} />{" "}
                    <span style={{ color: "#FF7315", fontWeight: "600" }}>Chat</span>
                  </a>
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
            {dataPemesanan.statusPemesanan === "Menunggu Pembayaran" ? (
              <div className="d-flex justify-content-center align-items-center" style={{ marginLeft: "auto" }}>
                <button onClick={() => formBayar(dataPemesanan.id)} className="btn btn-primary" style={{ fontSize: "12px", fontWeight: "700" }}>Bayar</button>
              </div>
            ) : (dataPemesanan.statusPemesanan === "Menunggu Konfirmasi" ? (
              <div className="d-flex justify-content-center align-items-center" style={{ marginLeft: "auto" }}>
                <button onClick={() => formBatal(dataPemesanan.id)} className="btn btn-danger" style={{ fontSize: "12px", fontWeight: "700" }}>Batalkan</button>
              </div>
            ) : null)}
          </div>
          <p className="d-flex justify-content-between align-content-center" style={{ fontWeight: "500" }}>Total Harga{" "}<span>{dataPemesanan.totalPembayaran}</span></p>
        </div>
        ))}
      </Container>
      <Footer />
    </>
  )
}

export default Booking;
