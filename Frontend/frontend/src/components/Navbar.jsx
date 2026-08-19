
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    Student Management System
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">

                        {user?.role === "admin" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-student">
                                        Add Student
                                    </Link>
                                </li>
                            </>
                        )}

                        {user?.role === "user" && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/user-dashboard"
                                >
                                    My Dashboard
                                </Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <span className="nav-link">
                                {user?.email}
                            </span>
                        </li>

                        <li className="nav-item">
                            <button
                                className="btn btn-danger btn-sm mt-1"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;