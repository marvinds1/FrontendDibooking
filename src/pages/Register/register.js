import { useState, useEffect } from 'react';
import { Row, Col, Card, Image, Form, FloatingLabel, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import TextInputWithFloatLabel from '../../components/TextInputWithFloatLabel/TextInputWithFloatLabel';
import DAlert from '../../components/Alert';
import logo from '../../assets/icons/logo.png';
import ilustrations from '../../assets/images/ilustrations.png';
import { backendEndpoint } from '../../backend';

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const [form, setForm] = useState({
    nama: "",
    nomor_ponsel: "",
    email: "",
    password: "",
    konfirmasi_password: "",
    daftar_sebagai: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [isFillButtonHovered, setFillButtonHovered] = useState(false);
  const [isOutlineButtonHovered, setOutlineButtonHovered] = useState(false);

  const buttonFill = {
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textTransform: 'capitalize',
    backgroundColor: '#ff7315',
    color: 'white',
    width: '100%',
    height: '50px',
    marginTop: '2rem',
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
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textTransform: 'capitalize',
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: form.nama,
      nomor_ponsel: form.nomor_ponsel,
      email: form.email,
      password: form.password,
      daftar_sebagai: form.daftar_sebagai,
    };
    console.log(data);
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      axios.post(`${backendEndpoint}/api/user/register`, data)
        .then((response) => {
          setLoading(false);
          navigate('/login');
          alert('Berhasil mendaftar');
        })
        .catch((error) => {
          setLoading(false);
          setAlert({
            status: true,
            message: "Server Internal Error.",
            type: "danger",
          });
        });
    }
  };

  const validateForm = () => {
    if (
      form.nama.trim() === "" ||
      form.nomor_ponsel.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.konfirmasi_password.trim() === "" ||
      form.daftar_sebagai.trim() === ""
    ) {
      setAlert({
        status: true,
        message: "Harap isi semua field.",
        type: "danger",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setAlert({
        status: true,
        message: "Harap masukkan alamat Email yang valid.",
        type: "danger",
      });
      return false;
    }
    if (form.password.length < 6) {
      setAlert({
        status: true,
        message: "Password minimal 6 karakter.",
        type: "danger",
      });
      return false;
    }
    if (form.password !== form.konfirmasi_password) {
      setAlert({
        status: true,
        message: "Password dan Konfirmasi Password harus sama.",
        type: "danger",
      });
      return false;
    }
    return true;
  };

  return (
    <div className="h-100">
      <Row className="g-0">
        <Col lg="6" className="d-flex align-items-center">
          <Card.Body>
            <div className="text-center mt-5">
              <a href='/'>
                <Image src={logo} alt="logo" style={{ width: "117px", height: "74px", objectFit: "cover", marginLeft: "45px" }}></Image>
              </a>
              <Card.Title className="mt-1 mb-2">Daftar</Card.Title>
              <Card.Text>Silahkan daftar akun terlebih dahulu</Card.Text>
            </div>
            <Form className="py-5 px-4">
              {alert.status && (
                <DAlert message={alert.message} type={alert.type} />
              )}
              <TextInputWithFloatLabel
                label="Nama Lengkap"
                name="nama"
                value={form.nama}
                type="text"
                placeholder="Jhon Wick"
                onChange={handleChange}
              />
              <TextInputWithFloatLabel
                label="Nomor Ponsel"
                name="nomor_ponsel"
                value={form.nomor_ponsel}
                type="number"
                placeholder="081234567890"
                onChange={handleChange}
              />
              <TextInputWithFloatLabel
                label="Email"
                name="email"
                value={form.email}
                type='email'
                placeholder='name@example.com'
                onChange={handleChange}
              />
              <TextInputWithFloatLabel
                label="Password"
                name="password"
                value={form.password}
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <TextInputWithFloatLabel
                label="Konfirmasi Password"
                name="konfirmasi_password"
                value={form.konfirmasi_password}
                type="password"
                placeholder="Password Confirmation"
                onChange={handleChange}
              />
              <FloatingLabel
                size="sm"
                controlId="floatingSelect"
                label="Daftar Sebagai"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select"
                  name="daftar_sebagai"
                  value={form.daftar_sebagai}
                  onChange={handleChange}
                >
                  <option>Buka menu pilih ini</option>
                  <option value="Pemilik Lapangan">Pemilik Lapangan</option>
                  <option value="Penyewa">Penyewa</option>
                </Form.Select>
              </FloatingLabel>
              <div className="text-muted mb-4">
                Sudah punya akun? <a href="/login" style={{ fontWeight: "bold", textDecoration: "none" }}>Masuk</a>
              </div>
              <Button
                style={isFillButtonHovered ? buttonFillHover : buttonFill}
                disabled={loading}
                onClick={handleSubmit}
                onMouseEnter={() => setFillButtonHovered(true)}
                onMouseLeave={() => setFillButtonHovered(false)}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="mr-4" /> Loading...
                  </>
                ) : (
                  'Daftar'
                )}
              </Button>
              <hr className="my-3" />
              <Button style={isOutlineButtonHovered ? buttonOutlineHover : buttonOutline}
                onMouseEnter={() => setOutlineButtonHovered(true)}
                onMouseLeave={() => setOutlineButtonHovered(false)}
              >
                <FcGoogle className="me-2 mb-1" style={{ width: "25px", height: "25px" }} />
                Daftar dengan Google
              </Button>
            </Form>
          </Card.Body>
        </Col>
        <Col lg="6" className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#ff7315" }}>
          <Image src={ilustrations} className="d-none d-lg-block p-3" alt="logo-register" style={{ width: "450px", height: "450px", objectFit: "cover" }} />
        </Col>
      </Row>
    </div>
  );
}

export default Register;
