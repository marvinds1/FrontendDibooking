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
                  <Form.Select
                    name="facilities"
                    value={form.facilities}
                    onChange={handleInputChange}
                    placeholder="Fasilitas lapangan"
                  >
                    <option value="">Pilih fasilitas lapangan</option>
                    <option value="2">1. Kamar Mandi</option>
                    <option value="3">2. Musholla</option>
                    <option value="5">3. Kantin</option>
                    <option value="7">4. Parkir</option>
                    <option value="11">5. Gratis 2 Botol Minum 1,5 Liter</option>
                    <option value="6">Fasilitas 1 dan 2</option>
                    <option value="10">Fasilitas 1 dan 3</option>
                    <option value="14">Fasilitas 1 dan 4</option>
                    <option value="22">Fasilitas 1 dan 5</option>
                    <option value="15">Fasilitas 2 dan 3</option>
                    <option value="21">Fasilitas 2 dan 4</option>
                    <option value="33">Fasilitas 2 dan 5</option>
                    <option value="35">Fasilitas 3 dan 4</option>
                    <option value="55">Fasilitas 3 dan 5</option>
                    <option value="77">Fasilitas 4 dan 5</option>
                    <option value="30">Fasilitas 1, 2, dan 3</option>
                    <option value="42">Fasilitas 1, 2, dan 4</option>
                    <option value="66">Fasilitas 1, 2, dan 5</option>
                    <option value="70">Fasilitas 1, 3, dan 4</option>
                    <option value="110">Fasilitas 1, 3, dan 5</option>
                    <option value="154">Fasilitas 1, 4, dan 5</option>
                    <option value="105">Fasilitas 2, 3, dan 4</option>
                    <option value="165">Fasilitas 2, 3, dan 5</option>
                    <option value="231">Fasilitas 2, 4, dan 5</option>
                    <option value="385">Fasilitas 3, 4, dan 5</option>
                    <option value="330">Fasilitas 1, 2, 3, dan 4</option>
                    <option value="462">Fasilitas 1, 2, 3, dan 5</option>
                    <option value="770">Fasilitas 1, 2, 4, dan 5</option>
                    <option value="1155">Fasilitas 1, 3, 4, dan 5</option>
                    <option value="1155">Fasilitas 2, 3, 4, dan 5</option>
                    <option value="2310">Fasilitas 1, 2, 3, 4, dan 5</option>
                  </Form.Select>
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
