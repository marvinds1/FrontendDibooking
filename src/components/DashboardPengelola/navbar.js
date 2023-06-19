import { useState } from "react";
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";

function Navbar({user}) {
    const navigate = useNavigate();
    const [style, setStyle] = useState("navbar-nav dibooking-orange sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style === "navbar-nav dibooking-orange sidebar sidebar-dark accordion") {
            setStyle("navbar-nav dibooking-orange sidebar sidebar-dark accordion toggled");
        } else {
            setStyle("navbar-nav dibooking-orange sidebar sidebar-dark accordion");
        }
    }
    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
    };
    const name = user;
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle}>
                    <i className="fa fa-bars icon-color"></i>
                </button>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow">
                        <Link className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{name}</span>
                            <Image className="img-profile rounded-circle"
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <Link onClick={logout} className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Keluar
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
