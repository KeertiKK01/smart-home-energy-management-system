import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultProfilePic from "../assets/react.svg";
import LoadingIndicator from "./LoadingIndicator";
import "./SNavBar.css";

const SNavBar = () => {

const navigate = useNavigate();

/* ================= USER STATE ================= */

const [username, setUsername] = useState("User");
const [image, setImage] = useState(null);
const [loading] = useState(false);


/* ================= LOAD USER ================= */

useEffect(() => {

try {

const storedUser = JSON.parse(localStorage.getItem("user"));

if (storedUser) {

setUsername(storedUser.name || "User");

if (storedUser.profilePic) {
setImage("http://localhost:8081/uploads/" + storedUser.profilePic);
}

}

} catch (error) {
console.log("User load error:", error);
}

}, []);


/* ================= LOGOUT ================= */

const handleLogout = () => {

localStorage.clear();
sessionStorage.clear();

navigate("/");

};


/* ================= UI ================= */

return (

<nav
className="navbar navbar-expand navbar-light bg-secondary topbar static-top mb-3"
style={{ maxHeight: 60 }}
>

<div className="container-fluid">

<ul className="navbar-nav w-100 justify-content-end">

<li className="nav-item dropdown no-arrow">

<button
className="nav-link dropdown-toggle bg-transparent border-0 d-flex align-items-center"
data-bs-toggle="dropdown"
style={{ cursor: "pointer" }}
>

<span
className="d-inline me-2 text-light small"
style={{ fontFamily: "Mogra, Ribeye, sans-serif" }}
>
{username}
</span>

{!loading ? (

<img
className="border rounded-circle img-profile bg-light"
src={image ? image : defaultProfilePic}
alt="Profile"
style={{
objectFit: "cover",
width: "35px",
height: "35px"
}}
/>

) : (

<LoadingIndicator
minHeightVal={"40px"}
size={"25px"}
color={"light"}
/>

)}

</button>

<ul className="dropdown-menu dropdown-menu-end">

<li>
<Link className="dropdown-item" to="/dashboard/profile">
<i className="fas fa-user me-2"></i>
Profile
</Link>
</li>

<li>
<div className="dropdown-divider"></div>
</li>

<li>
<button
className="dropdown-item"
onClick={handleLogout}
>
<i className="fas fa-sign-out-alt me-2"></i>
Logout
</button>
</li>

</ul>

</li>

</ul>

</div>

</nav>

);

};

export default SNavBar;