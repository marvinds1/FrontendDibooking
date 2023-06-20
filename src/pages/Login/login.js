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

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) {
      setAlert({
        status: true,
        message: "Email harus diisi",
        type: "danger",
      });
      return;
    }
    if (!form.password) {
      setAlert({
        status: true,
        message: "Password harus diisi",
        type: "danger",
      });
      return;
    }
    if (!form.daftar_sebagai) {
      setAlert({
        status: true,
        message: "Pilih jenis masuk",
        type: "danger",
      });
      return;
    }

    setLoading(true);
    axios.post(`${backendEndpoint}/api/user/login`, form)
      .then((response) => {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        if (form.daftar_sebagai === "Pemilik Lapangan") {
          navigate("/dashboard");
        }
        else {
          navigate("/");
        }
        alert("Login berhasil");
      })
      .catch((error) => {
        setLoading(false);
        setAlert({
          status: true,
          message: "Login gagal. Periksa kembali email dan password Anda",
          type: "danger",
        });
      });
  };

  return (
    <div className="h-100">
      <Row className="g-0" style={{ height: "100%" }}>
        <Col lg="6" className="d-flex align-items-center">
          <Card.Body>
            <div className="text-center mt-5">
              <a href='/'>
                <Image src={logo} alt="logo" style={{ width: "117px", height: "74px", objectFit: "cover", marginLeft: "45px" }}></Image>
              </a>
              <Card.Title className="mt-1 mb-2">Masuk</Card.Title>
              <Card.Text>Silahkan masuk untuk lanjut ke website kami</Card.Text>
            </div>
            <Form className="py-5 px-4">
              {alert.status && (
                <DAlert message={alert.message} type={alert.type} />
              )}
              <TextInputWithFloatLabel
                label="Email"
                name="email"
                value={form.email}
                type="email"
                placeholder="name@example.com"
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
              <FloatingLabel
                size="sm"
                controlId="floatingSelect"
                label="Masuk Sebagai"
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
              <Row className="mb-4">
                <Col className="text-muted">
                  Belum punya akun? <a href="register" style={{ fontWeight: "bold", textDecoration: "none" }}>Daftar</a>
                </Col>
                <Col className="d-flex justify-content-end">
                  <a href="/reset" style={{ fontWeight: "bold", textDecoration: "none" }}>Lupa Password?</a>
                </Col>
              </Row>
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
                  'Masuk'
                )}
              </Button>
              <hr className="my-3" />
              <Button style={isOutlineButtonHovered ? buttonOutlineHover : buttonOutline}
                onMouseEnter={() => setOutlineButtonHovered(true)}
                onMouseLeave={() => setOutlineButtonHovered(false)}
              >
                <FcGoogle className="me-2 mb-1" style={{ width: "25px", height: "25px" }} />
                Masuk dengan Google
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

export default Login;
