import { useState, useEffect } from 'react'
import { Col, Container, Row, Card, Image, Button, Form, FloatingLabel } from "react-bootstrap";
import TextInputWithFloatLabel from '../../components/DashboardPengelola/TextInputWithFloatLabel';
import "../../pages/DashboardPengelola/dashboard.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import locations from '../../components/Lokasi/data';
import { backendEndpoint } from '../../backend';

function Detail() {
  const [dataPenyewa, setDataPenyewa] = useState({
    imageSrc: "",
    name: "",
    saldo: "",
    email: "",
    nomor_ponsel: "",
    lokasi: ""
  });
  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (!loggedIn) {
      window.location.href = "/login";
    }
    async function fetchData() {
      const response = await axios.get(`${backendEndpoint}/api/detail/profile`, {
        headers: {
          Authorization: loggedIn,
        },
      });
      setDataPenyewa({
        id: response.data.token.id,
        imageSrc: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
        name: response.data.token.name,
        saldo: response.data.token.saldo,
        email: response.data.token.email,
        nomor_ponsel: response.data.token.nomor_ponsel,
        lokasi: response.data.token.lokasi
      });
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  const updateProfile = async () => {
    const loggedIn = localStorage.getItem("token");
    const data = {
      name: dataPenyewa.name,
      email: dataPenyewa.email,
      nomor_ponsel: dataPenyewa.nomor_ponsel,
      lokasi: dataPenyewa.lokasi
    }
    const response = await axios.put(`${backendEndpoint}/api/detail/update`, data, {
      headers: {
        Authorization: `${loggedIn}`,
      },
    });
    if (response.status === 200) {
      navigate("/dashboard")
      alert("Berhasil mengubah data");
    } else {
      alert("Gagal mengubah data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPenyewa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [isOutlineButtonHovered, setOutlineButtonHovered] = useState(false);
  const [isFillButtonHovered, setFillButtonHovered] = useState(false);

  const buttonOutline = {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#ff7315',
    width: '220px',
    height: '40px',
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
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#ff7315',
    color: 'white',
    width: '100%',
    height: '50px',
    marginTop: '0.1rem',
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

  const dataLokasi = {
    options: [
      { label: 'Buka menu pilih ini', value: '' },
      ...locations.map((location) => {
        return { label: location, value: location }
      })
    ]
  };

  return (
    <Container className="py-5">
    <Row>
      <Col lg="4">
        <Card className="mb-4">
          <Card.Body className="text-center">
            <Image
              src={dataPenyewa.imageSrc}
              alt="avatar"
              style={{ width: '150px' }}
              roundedCircle />
            <Card.Title className="mt-3">{dataPenyewa.name}</Card.Title>
            <p className="text-muted mt-3">Saldo Anda : {dataPenyewa.saldo}</p>
            <div className="d-flex justify-content-center mb-2">
              <Button style={isFillButtonHovered ? buttonFillHover : buttonFill}
                onMouseEnter={() => setFillButtonHovered(true)}
                onMouseLeave={() => setFillButtonHovered(false)}
              >Tarik Saldo</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col lg="8">
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="12" className="d-flex flex-column justify-content-center align-content-center py-4">
                <h2 style={{ fontWeight: "600" }}>Profil</h2>
                <Card.Text>Lengkapi profil Anda</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="12" className="d-flex flex-column justify-content-center align-content-center pt-4 pb-4">
                <TextInputWithFloatLabel
                  label='Nama Lengkap'
                  id='namaLengkap'
                  type='text'
                  name="name"
                  placeholder={dataPenyewa.name}
                  value={dataPenyewa.name}
                  onChange={handleChange}
                />
              </Col>
              <Col sm="12" className="d-flex flex-column justify-content-center align-content-center pb-4">
                <TextInputWithFloatLabel
                  label='Email'
                  id='email'
                  type='text'
                  name="email"
                  placeholder={dataPenyewa.email}
                  value={dataPenyewa.email}
                  onChange={handleChange}
                />
              </Col>
              <Col sm="12" className="d-flex flex-column justify-content-center align-content-center pb-4">
                <TextInputWithFloatLabel
                  label='Nomor Telepon'
                  id='nomorTelepon'
                  type='text'
                  name="nomor_ponsel"
                  placeholder={dataPenyewa.nomor_ponsel}
                  value={dataPenyewa.nomor_ponsel}
                  onChange={handleChange}
                />
              </Col>
              <Col sm="12" className="d-flex flex-column justify-content-center align-content-center pb-0">
                <FloatingLabel
                  size="sm"
                  controlId="floatingSelect"
                  label="Lokasi"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Floating label select"
                    name="lokasi"
                    value={dataPenyewa.lokasi}
                    onChange={handleChange}
                  >
                    {dataLokasi.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col sm="12" className="d-flex flex-column flex-sm-row justify-content-between align-content-center pb-4">
                <Form.Check type="switch" id="custom-switch" label="Aktifkan Notifikasi" />
                <Button style={isOutlineButtonHovered ? buttonOutlineHover : buttonOutline}
                  onMouseEnter={() => setOutlineButtonHovered(true)}
                  onMouseLeave={() => setOutlineButtonHovered(false)}
                >Verifikasi No. WhatsApp</Button>
              </Col>
              <Col sm="12" className="d-flex justify-content-between align-content-center pb-4">
                <Button style={isFillButtonHovered ? buttonFillHover : buttonFill}
                  onMouseEnter={() => setFillButtonHovered(true)}
                  onMouseLeave={() => setFillButtonHovered(false)}
                  onClick={updateProfile}
                >Simpan</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}


export default Detail
