import React, { useEffect, useState } from 'react';
import { Button, Container, Image, Spinner } from 'react-bootstrap';
import qrCode from '../../assets/images/qr_code.png';

const PaymentConfirmation = () => {
  const [countdown, setCountdown] = useState(900);
  const [timer, setTimer] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    setTimer(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  }, [countdown]);

  const [isFillButtonHovered, setFillButtonHovered] = useState(false);

  const buttonFill = {
    fontWeight: 'bold',
    backgroundColor: '#ff7315',
    color: 'white',
    width: '180px',
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

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h2 className="mb-5" style={{ fontWeight: "600" }}>Silahkan Scan QR Code Dibawah Untuk Melakukan Pembayaran</h2>
        <Image src={qrCode} alt="QR Code" style={{ height: "200px", width: "200px" }} />

        <div className="my-5">
          <h1 style={{ fontWeight: "700" }}>{timer}</h1>
        </div>

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
            'Kembali ke Beranda'
          )}
        </Button>
      </div>
    </Container>
  );
};

export default PaymentConfirmation;
