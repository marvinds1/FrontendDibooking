import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function ModalTambahRev(props) {
    const [form, setForm] = React.useState({
        nameUser: "",
        idField: props.idField,
        desc: "",
        rating: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    async function TambahReview() {
        console.log(form);
        await axios.post("http://localhost:8000/api/review/add", form)
        .then((response) => {
            console.log(response);
            alert("Review berhasil ditambahkan");
        })
        .catch((error) => {
            console.log(error);
            alert("Review gagal ditambahkan");
        });
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        TambahReview();
        props.onHide();
    };

    return (
        <React.Fragment>
          <Modal {...props} centered>
            <Modal.Header closeButton>
              <Modal.Title>Review Lapangan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Pengguna</Form.Label>
              <Form.Control
                type="text"
                name="nameUser"
                value={form.nameUser}
                onChange={handleInputChange}
                placeholder="Nama Pengguna"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="desc"
                value={form.desc}
                onChange={handleInputChange}
                placeholder="Deskripsi Lapangan"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                name="rating"
                value={form.rating}
                onChange={handleInputChange}
              >
                <option value="">Pilih rating</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
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

export default ModalTambahRev
