/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import './modalDetail.css';
import axios from 'axios';
import { backendEndpoint } from '../../../backend';

function MyVerticallyCenteredModal(props) {
  const [item, setItem] = useState({
    nama: "",
    kategori: "",
    lokasi: "",
    harga: "",
    deskripsi: "",
  });

  async function getData() {
    const response = await axios.get(`${backendEndpoint}/api/lapangan/detail/${props.id}`);
    setItem({
      nama: response.data.name,
      kategori: response.data.kategori,
      lokasi: response.data.lokasi,
      harga: response.data.harga,
      deskripsi: response.data.deskripsi,
    });
  }

  useEffect(() => {
    if (props.show) {
      getData();
    }
  }, [props.id]);

  const handleInputChange1 = (event) => {
    setItem({
      ...item,
      nama: event.target.value,
    });
  };

  const handleInputChange2 = (event) => {
    setItem({
      ...item,
      kategori: event.target.value,
    });
  };

  const handleInputChange3 = (event) => {
    setItem({
      ...item,
      lokasi: event.target.value,
    });
  };

  const handleInputChange4 = (event) => {
    setItem({
      ...item,
      harga: event.target.value,
    });
  };

  const handleInputChange5 = (event) => {
    setItem({
      ...item,
      deskripsi: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(item);
    axios.put(`${backendEndpoint}/api/lapangan/update/${props.id}`, item)
    .then((response) => {
      console.log(response);
      alert("Lapangan berhasil diubah");
    })
    .catch((error) => {
      console.log(error);
      alert("Lapangan gagal diubah");
    });
    window.location.reload();
  };

  return (
    <React.Fragment>
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Detail Lapangan
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Nama lapangan" value={item.nama} onChange={handleInputChange1} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Kategori</Form.Label>
                <Form.Select className='mb-3' aria-label="Default select example" onChange={handleInputChange2}>
                  <option>{item.kategori}</option>
                  <option value="1">Sepak Bola</option>
                  <option value="2">Futsal</option>
                  <option value="3">Bulu Tangkis</option>
                  <option value="4">Basket</option>
                  <option value="5">Voli</option>
                  <option value="6">Billiard</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Lokasi</Form.Label>
                <Form.Control type="text" placeholder="Lokasi Lapangan" value={item.lokasi} onChange={handleInputChange3} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Harga</Form.Label>
                <Form.Control type="text" placeholder="Harga Lapangan" value={item.harga} onChange={handleInputChange4} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="textAreaFasilitas">
                <Form.Label>Fasilitas Lainnya</Form.Label>
                <Form.Control as="textarea" rows={3} value={item.deskripsi} onChange={handleInputChange5} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleFormSubmit}
              className="btn-dark"
            >
              Update
            </Button>
            <Button
              onClick={props.onHide}
              className="btn-dark button-detail"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </React.Fragment>
  );
}

export default MyVerticallyCenteredModal;