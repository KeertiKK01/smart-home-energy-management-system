import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {

const navigate = useNavigate();

const [username, setUsername] = useState("User");
const [deviceCount, setDeviceCount] = useState(0);


/* ================= LOAD USER + DEVICES FROM DB ================= */

useEffect(() => {

const loadData = async () => {

const user = JSON.parse(localStorage.getItem("user"));
if (!user) return;

/* username */
setUsername(user.name);

try {

const res = await axios.get(
`http://localhost:8081/device/user/${user.id}`
);

/* device count */
setDeviceCount(res.data.length);

} catch (err) {
console.log(err);
}

};

loadData();

}, []);



return (

<div className="home-container container-fluid">


{/* HERO SECTION */}

<div className="hero-section">

<h1 className="hero-title">
Welcome {username} 👋
</h1>

<h3 className="hero-subtitle">
Smart Home Energy Management System
</h3>

<p className="hero-text">
Monitor electricity usage, manage smart devices and
optimize energy consumption in your home.
</p>


<div className="hero-actions">

<button
className="btn btn-light hero-action-btn"
onClick={() => navigate("/dashboard/overview")}
>
Open Dashboard
</button>

<button
className="btn btn-light hero-action-btn"
onClick={() => navigate("/dashboard/device")}
>
Manage Devices
</button>

</div>

</div>


{/* QUICK STATS */}

<div className="row stats-row g-4">

<div className="col-md-4">
<div className="stats-card">
<h3>{deviceCount}</h3>
<p>Connected Devices</p>
</div>
</div>

<div className="col-md-4">
<div className="stats-card">
<h3>24/7</h3>
<p>Energy Monitoring</p>
</div>
</div>

<div className="col-md-4">
<div className="stats-card">
<h3>Smart</h3>
<p>Automation System</p>
</div>
</div>

</div>


{/* SERVICES */}

<h3 className="section-title">Our Smart Services</h3>

<div className="row g-4">

<div className="col-md-4">
<div className="service-card">
<div className="service-icon">🏠</div>
<h5>Smart Home Automation</h5>
<p>Control lights, appliances remotely.</p>
</div>
</div>

<div className="col-md-4">
<div className="service-card">
<div className="service-icon">⚡</div>
<h5>Energy Monitoring</h5>
<p>Track electricity usage easily.</p>
</div>
</div>

<div className="col-md-4">
<div className="service-card">
<div className="service-icon">📊</div>
<h5>Energy Reports</h5>
<p>View detailed reports.</p>
</div>
</div>

</div>


{/* BENEFITS */}

<h3 className="section-title">Energy Saving Benefits</h3>

<div className="row g-4">

<div className="col-md-4">
<div className="benefit-card">
<span>💰</span>
<h5>Reduce Electricity Bills</h5>
</div>
</div>

<div className="col-md-4">
<div className="benefit-card">
<span>🌱</span>
<h5>Eco Friendly Energy Usage</h5>
</div>
</div>

<div className="col-md-4">
<div className="benefit-card">
<span>⚙</span>
<h5>Smart Automation</h5>
</div>
</div>

</div>


{/* ALERTS */}

<h3 className="section-title">Alerts & Tips</h3>

<div className="row g-4">

<div className="col-md-6">
<div className="alert-card">
<h5>⚠ Energy Alert</h5>
<p>Your electricity usage increased this week.</p>
</div>
</div>

<div className="col-md-6">
<div className="tip-card">
<h5>💡 Energy Saving Tip</h5>
<p>Use LED bulbs and unplug chargers.</p>
</div>
</div>

</div>

</div>

);

};

export default HomePage;