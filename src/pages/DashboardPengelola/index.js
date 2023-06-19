/* eslint-disable react-hooks/exhaustive-deps */
import Detail from "./detail";
import Kelola from "./kelola";
import Konfirmasi from "./konfirmasi";
import Navbar from '../../components/DashboardPengelola/navbar';
import Footer from '../../components/DashboardPengelola/footer';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [style, setStyle] = useState("navbar-nav dibooking-orange sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style === "navbar-nav dibooking-orange sidebar sidebar-dark accordion") {
            setStyle("navbar-nav dibooking-orange sidebar sidebar-dark accordion toggled");
        } else {
            setStyle("navbar-nav dibooking-orange sidebar sidebar-dark accordion");
        }
    }
    const [content, setContent] = useState(<Kelola />);

    const handleKelolaClick = () => {
        setContent(<Kelola />);
    };

    const handleKonfirmasiClick = () => {
        setContent(<Konfirmasi id={user.id} />);
    };

    const handleDetailClick = () => {
        setContent(<Detail />);
    };

    const [user, setUser] = useState({
        id: "",
        name: "",
    });

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        const response = await fetch("https://backend-dibooking.vercel.app/api/detail/profile", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        if (data.token.status === 'Pemilik Lapangan') {
            setUser({
                id: data.token.id,
                name: data.token.name,
              });
        } else {
            navigate("/");
        }
    };
    
    useEffect(() => {
        fetchUser();
    });
    
    const logout = () => {
        localStorage.removeItem("token");
    };

    return (
        <>
        <div id='wrapper'>
            <div className="Sidebar">
                <ul className={style} id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">Dibooking</div>
                    </a>
                    <hr className="sidebar-divider my-0" />
                    <li className="nav-item">
                        <Link className="nav-link" onClick={handleKelolaClick}>
                            <i className="fas fa-clipboard-list"></i>
                            <span>Kelola Lapangan</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" onClick={handleKonfirmasiClick}>
                            <i className="fas fa-shopping-cart"></i>
                            <span>Konfirmasi Pemesanan</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" onClick={handleDetailClick}>
                            <i className="fas fa-user-circle"></i>
                            <span>Detail Akun</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" onClick={logout}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Keluar</span></Link>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block" />
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle} ></button>
                    </div>
                </ul>
            </div>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar user={user.name} />
                        {content}
                </div>
                <Footer />
            </div>
        </div>
        </>
    )
}


export default Dashboard
