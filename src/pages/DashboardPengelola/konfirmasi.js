/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import "../../pages/DashboardPengelola/dashboard.css";
import axios from 'axios';
import { backendEndpoint } from '../../backend';


function Konfirmasi({id}) {
    const [pesan, setPesan] = useState([]);
    const userId = id;
    const fetchPesan = async () => {
        const response = await axios.get(`${backendEndpoint}/api/pemesanan/rekap/${userId}`);
        setPesan(response.data);
    };
    useEffect(() => {
        fetchPesan();
    }, []);

    async function cancel(id) {
        const response = await axios.put(`${backendEndpoint}/api/pemesanan/cancel/${id}`);
        if (response) {
            alert("Pesanan berhasil dibatalkan");
            fetchPesan();
        }
    };

    async function terima(id) {
        const response = await axios.put(`${backendEndpoint}/api/pemesanan/terima/${id}`);
        if (response) {
            alert("Pesanan berhasil diterima");
            fetchPesan();
        }
        else {
            alert("Pesanan gagal diterima");
        }
    };

    return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Konfirmasi Pemesanan</h1>
                </div>
                <table className="table table-striped text-center">
                    <thead>
                        <tr className="dibooking-orange text-white">
                            <th scope="col">No.</th>
                            <th scope="col">Nama Lapangan</th>
                            <th scope="col">Penyewa</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Waktu</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesan.map((item, index) => (
                            <tr className="text-dark" key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.nama}</td>
                                <td>{item.tanggal}</td>
                                <td>{item.jam}</td>
                                <td>
                                    <button onClick={() => terima(item.idPesanan)} className="btn btn-sm text-white button-terima">Terima</button> | <button onClick={() => cancel(item.idPesanan)} className="btn btn-sm text-white button-tolak">Tolak</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
    )
}

export default Konfirmasi
