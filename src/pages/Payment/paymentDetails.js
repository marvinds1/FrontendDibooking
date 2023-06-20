/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Container, Image, Form, Button } from 'react-bootstrap';
import { BiUserCircle, BiMessageDetail } from "react-icons/bi";
import { GiSoccerField } from "react-icons/gi";
import iconProfileBox from '../../assets/icons/ic_profile_box.png';
import { FaMoneyBillWave } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { backendEndpoint } from '../../backend';


function PaymentDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const bookingId = params.id;
  const [booking, setBooking] = useState({
    penyewa: {
      name: "",
      nomor_ponsel: "",
      saldo: ""
    },
    lapangan: {
      manager: "",
      title: "",
      price: "",
      nomor_ponsel: ""
    },
    pesanan: {
      total: "",
      tanggal: "",
      jam: "",
      status: ""
    }
  });
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${backendEndpoint}/api/pemesanan/confirmation/${bookingId}`);
      setBooking(response.data);
      if (response.data.pesanan.status !== "Menunggu Pembayaran") {
        navigate(`/`);
      }
    }
    fetchData();
  }, [bookingId]);
  
  const dataPenyewa = {
    nama: booking.penyewa.name,
    nomorTelepon: booking.penyewa.nomor_ponsel,
  };

  const dataPemesanan = {
    namaManajemen: booking.lapangan.manager,
    namaLapangan: booking.lapangan.title,
    tanggalPemesanan: booking.pesanan.tanggal,
    nomorTeleponManajemen: `https://wa.me/${booking.lapangan.nomor_ponsel}`,
    jamPemesanan: booking.pesanan.jam,
    hargaSewa: `Rp ${booking.lapangan.price}/Jam`,
    totalPembayaran: `Rp ${booking.pesanan.total}`
  };

  const dataPembayaran = {
    saldo: booking.penyewa.saldo,
    status: booking.pesanan.status,
    metodePembayaran: "DibookingPay",
    totalPembayaran: `Rp ${booking.pesanan.total}`,
    peringatan: "Mohon selesaikan pembayaran secepatnya."
  };

  const saldoMencukupi = dataPembayaran.saldo >= 2*booking.lapangan.price;

  const [isOutlineButtonHovered, setOutlineButtonHovered] = useState(false);
  const [isFillButtonHovered, setFillButtonHovered] = useState(false);

  const buttonOutline = {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#ff7315',
    width: '100%',
    height: '50px',
    marginRight: '8px',
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
    marginLeft: '8px',
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

  const [isLoading, setIsLoading] = useState(false);

  async function handlePayment() {
    setIsLoading(true);
    await axios.put(`${backendEndpoint}/api/pemesanan/confirmation/${bookingId}`);
    setIsLoading(false);
    navigate("/", alert("Pembayaran berhasil dilakukan."));
  }

  const handleClick = () => {
    if (!saldoMencukupi) {
      return alert("Silahkan isi saldo terlebih dahulu.");
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handlePayment();
    }, 2000);
  };

  return (
    <>
      <Container className="py-5">
        <div className="mb-5" style={{ height: "fit-content", overflow: "hidden", margin: "auto", }}>
          <div className="mb-5">
            <p className="d-flex align-items-center mb-2" style={{ color: "#FF7315", fontWeight: "700" }}>
              <BiUserCircle style={{ color: "#FF7315", marginRight: "5px", height: "25px", width: "25px" }} />
              Penyewa
            </p>
            <p className="mb-0" style={{ fontWeight: "700" }}>{dataPenyewa.nama}</p>
            <p className="mb-0" style={{ fontWeight: "700" }}>{dataPenyewa.nomorTelepon}</p>
          </div>
          <div className="mb-5">
            <p className="d-flex align-items-center mb-2" style={{ color: "#FF7315", fontWeight: "700" }}>
              <GiSoccerField style={{ color: "#FF7315", marginRight: "5px", height: "30px", width: "30px" }} />
              Lapangan Dipesan
            </p>
            <p className="mb-1">
              <span style={{ fontWeight: "700" }}>{dataPemesanan.namaManajemen}</span> |{" "}
              <a href={dataPemesanan.nomorTeleponManajemen} target="_blank" rel="noopener noreferrer" style={{ display: "inline", alignItems: "center", textDecoration: "none" }}>
                <BiMessageDetail style={{ color: "#FF7315" }} />{" "}
                <span style={{ color: "#FF7315", fontWeight: "600" }}>Chat</span>
              </a>
            </p>
            <div className="mb-2" style={{ display: "flex", height: "fit-content", overflow: "hidden", margin: "auto", borderBottom: "1px solid black", paddingBottom: "10px" }}>
              <Image src={iconProfileBox} alt="Profile Box" style={{ height: "60px", width: "75px" }} />
              <div className="content" style={{ alignItems: "center" }}>
                <p className="mb-1" style={{ marginLeft: "10px", fontWeight: "700", fontSize: "12px" }}>{dataPemesanan.namaLapangan}</p>
                <p className="mb-0" style={{ marginLeft: "10px", color: "#666666", fontSize: "12px" }}>Waktu : {dataPemesanan.tanggalPemesanan} | {dataPemesanan.jamPemesanan}</p>
                <p className="mb-0" style={{ marginLeft: "10px", color: "#666666", fontSize: "12px" }}>Harga : {dataPemesanan.hargaSewa}</p>
              </div>
            </div>
            <p className="d-flex justify-content-between align-content-center" style={{ fontWeight: "500" }}>Total Harga{" "}<span>{dataPemesanan.totalPembayaran}</span></p>
          </div>

          <div className="mb-0">
            <p className="d-flex align-items-center mb-2" style={{ color: "#FF7315", fontWeight: "700" }}>
              <FaMoneyBillWave style={{ color: "#FF7315", marginRight: "5px", height: "30px", width: "30px" }} />
              Pembayaran
            </p>
            <p style={{ fontSize: "13px", borderBottom: "1px solid black", paddingBottom: "10px" }}>
              Saldo DibookingPay : <strong>{dataPembayaran.saldo}</strong>
            </p>
            <div className="d-flex flex-column justify-content-end"></div>
            <div className="d-flex flex-column flex-wrap align-content-end" style={{ borderBottom: "1px solid black", paddingBottom: "15px" }}>
              <div style={{ width: "20rem" }}>
                <div className="d-flex justify-content-between">
                  <p className="mb-1">Status</p>
                  <p className="mb-1">{dataPembayaran.status}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-1">Metode Pembayaran </p>
                  <p className="mb-1">{dataPembayaran.metodePembayaran}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-1">Total Pembayaran </p>
                  <p className="mb-1" style={{ fontWeight: "700" }}>{dataPembayaran.totalPembayaran}</p>
                </div>
                <div className="d-flex justify-content-between">
                  {!saldoMencukupi ? (
                    <p className="mb-0" style={{ color: "red" }}>Maaf, Saldo Anda Tidak Mencukupi, Harap Mengisi Saldo Anda Terlebih Dahulu</p>
                  ) : (
                    <p className="mb-0" style={{ color: "green" }}>Saldo mencukupi</p>
                  )}
                </div>
              </div>
            </div>
            <p style={{ color: "red", fontSize: "12px" }} className="d-flex align-items-center mt-1 mb-0">
              <CiCircleAlert size={20} />
              <span className="ms-1">{dataPembayaran.peringatan}</span>
            </p>
            <div className="d-flex flex-column flex-wrap align-content-end">
              <Form className="d-flex justify-content-center pt-2" style={{ width: "100%", maxWidth: "25rem" }}>
                <Button href="/" style={{...(isOutlineButtonHovered ? buttonOutlineHover : buttonOutline), display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}
                  onMouseEnter={() => setOutlineButtonHovered(true)}
                  onMouseLeave={() => setOutlineButtonHovered(false)}
                >
                  Kembali
                </Button>
                <Button
                  style={isFillButtonHovered ? buttonFillHover : buttonFill}
                  disabled={isLoading}
                  onClick={handleClick}
                  onMouseEnter={() => setFillButtonHovered(true)}
                  onMouseLeave={() => setFillButtonHovered(false)}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="mr-4" /> Loading...
                    </>
                  ) : (
                    'Bayar Sekarang'
                  )}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </Container >
    </>
  )
}

export default PaymentDetails;