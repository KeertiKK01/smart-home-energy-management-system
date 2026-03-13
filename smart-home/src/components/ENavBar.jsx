import { Link, useNavigate, useLocation } from "react-router-dom";
import "./ENavBar.css";
import logo from "../assets/logo.png";

const ENavBar = () => {

const navigate = useNavigate();
const location = useLocation();

/* ================= LOGOUT ================= */

const handleLogout = () => {

localStorage.clear();
navigate("/");

};

/* ================= ACTIVE MENU ================= */

const isActive = (path) =>
location.pathname === path ? "active" : "";

return (

<nav className="sidebar">

{/* HEADER */}

<div className="sidebar-header">

<div className="logo-container">

<img
src={logo}
alt="SmartHome Logo"
className="sidebar-logo"
/>

<h2 className="logo-text">
Smart<span>Home</span>
</h2>

</div>

</div>

<ul className="sidebar-menu">

<li className={isActive("/dashboard")}>
<Link to="/dashboard">
<i className="fas fa-home"></i>
<span>Home</span>
</Link>
</li>

<li className={isActive("/dashboard/overview")}>
<Link to="/dashboard/overview">
<i className="fas fa-chart-line"></i>
<span>Dashboard</span>
</Link>
</li>

<li className={isActive("/dashboard/device")}>
<Link to="/dashboard/device">
<i className="fas fa-microchip"></i>
<span>Devices</span>
</Link>
</li>

<li className={isActive("/dashboard/profile")}>
<Link to="/dashboard/profile">
<i className="fas fa-user"></i>
<span>Profile</span>
</Link>
</li>

<li className="logout-btn" onClick={handleLogout}>
<i className="fas fa-sign-out-alt"></i>
<span>Logout</span>
</li>

</ul>

</nav>

);

};

export default ENavBar;