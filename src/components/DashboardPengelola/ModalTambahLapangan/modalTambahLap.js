import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import locations from '../../Lokasi/data';
import axios from 'axios';
import { backendEndpoint } from '../../../backend';

function ModalTambahLap(props) {
    const [form, setForm] = React.useState({
        title: "",
        token: localStorage.getItem("token"),
        typeField: "",
        imageSrc: "../../assets/images/lapangan.jpeg",
        location: "",
        description: "",
        facilities: "",
        address: "",
        price: "",
        openTime: "",
        closeTime: "",
    });

    const typeField = [
        'Futsal',
        'Sepak Bola',
        'Basket',
        'Bulu Tangkis',
        'Voli',
        'Billiard',
      ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    async function TambahLapangan() {
        console.log(form);
        await axios.post(`${backendEndpoint}/api/lapangan/add`, form)
        .then((response) => {
            console.log(response);
            alert("Lapangan berhasil ditambahkan");
        })
        .catch((error) => {
            console.log(error);
            alert("Lapangan gagal ditambahkan");
        });
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        TambahLapangan();
        props.onHide();
    };

    return (
        <React.Fragment>
          <Modal {...props} centered>
            <Modal.Header closeButton>
              <Modal.Title>Tambah Lapangan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="Judul lapangan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect2">
                <Form.Label>Tipe Lapangan</Form.Label>
                    <Form.Select
                        name="typeField"
                        value={form.typeField}
                        onChange={handleInputChange}
                        placeholder="Tipe lapangan"
                    >
                        <option value="">Pilih tipe lapangan</option>
                        {typeField.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Lokasi</Form.Label>
                        <Form.Select
                            name="location"
                            value={form.location}
                            onChange={handleInputChange}
                            placeholder="Lokasi lapangan"
                        >
                            <option value="">Pilih lokasi lapangan</option>
                            {locations.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                            ))}
                        </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Deskripsi lapangan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Fasilitas</Form.Label>
                  <Form.Label>note: harap mengisikan dengan format angka</Form.Label>
                  <Form.Label>2 untuk Kamar Mandi, </Form.Label>
                  <Form.Label>3 untuk Musholla, </Form.Label>
                  <Form.Label>5 untuk Kantin, </Form.Label>
                  <Form.Label>7 untuk Parkir, </Form.Label>
                  <Form.Label>11 untuk Gratis 2 Botol Minuman, </Form.Label>
                  <Form.Label>dan kombinasi perkalian untuk memunculkan lebih dari satu fasilitas, contoh 6 untuk fasilitas 2 dan 3</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="facilities"
                    value={form.facilities}
                    onChange={handleInputChange}
                    placeholder="Fasilitas lapangan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="Alamat lapangan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    placeholder="Harga lapangan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Jam Buka</Form.Label>
                  <Form.Control
                    type="text"
                    name="openTime"
                    value={form.openTime}
                    onChange={handleInputChange}
                    placeholder="Jam buka lapangan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Jam Tutup</Form.Label>
                  <Form.Control
                    type="text"
                    name="closeTime"
                    value={form.closeTime}
                    onChange={handleInputChange}
                    placeholder="Jam tutup lapangan"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-dark button-detail" onClick={handleFormSubmit}>
                Tambah
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
}

export default ModalTambahLap
