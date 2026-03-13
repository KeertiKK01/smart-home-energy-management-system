import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import InnerLoadingPage from "./InnerLoadingPage";
import { FaLightbulb, FaFan, FaSnowflake, FaTv } from "react-icons/fa";
import "./Devices.css";

const Devices = () => {

const [isLoading, setIsLoading] = useState(true);
const [show, setShow] = useState(false);

const [enrolledDevices, setEnrolledDevices] = useState([]);

const [deviceTypes] = useState(["Light","AC","Heater","Fan","TV"]);
const [deviceModels] = useState(["Model-X","Model-Y","Model-Z"]);

const [deviceFormData, setDeviceFormData] = useState({
enDevName: "",
type: "",
model: "",
enrolledStatus: "enabled"
});

/* ================= LOAD DEVICES ================= */

useEffect(() => {

const user = JSON.parse(localStorage.getItem("user"));
if (!user) return;

const key = "devices_" + user.email;
const savedDevices = JSON.parse(localStorage.getItem(key)) || [];

setEnrolledDevices(savedDevices);

setTimeout(() => setIsLoading(false), 500);

}, []);

/* ================= SAVE DEVICES ================= */

useEffect(() => {

if (!isLoading) {
localStorage.setItem("devices", JSON.stringify(enrolledDevices));
}

}, [enrolledDevices, isLoading]);



/* ================= INPUT CHANGE ================= */

const handleChange = (e) => {

setDeviceFormData({
...deviceFormData,
[e.target.name]: e.target.value
});

};



/* ================= ADD DEVICE ================= */

const handleSubmitButton = (e) => {

e.preventDefault();

const newDevice = {
...deviceFormData,
enDevID: Date.now()
};

setEnrolledDevices(prev => [...prev, newDevice]);

setDeviceFormData({
enDevName: "",
type: "",
model: "",
enrolledStatus: "enabled"
});

setShow(false);

};



/* ================= DELETE DEVICE ================= */

const handleDelete = (id) => {

setEnrolledDevices(prev =>
prev.filter(device => device.enDevID !== id)
);

};



/* ================= TOGGLE DEVICE ================= */

const toggleStatus = (id) => {

setEnrolledDevices(prev =>
prev.map(device =>
device.enDevID === id
? {
...device,
enrolledStatus:
device.enrolledStatus === "enabled"
? "disabled"
: "enabled"
}
: device
)
);

};



/* ================= DEVICE ICON ================= */

const getDeviceIcon = (type) => {

switch(type){

case "Light":
return <FaLightbulb/>

case "Fan":
return <FaFan/>

case "AC":
return <FaSnowflake/>

case "TV":
return <FaTv/>

default:
return "🔌"
}

}



if (isLoading) return <InnerLoadingPage />;



return (

<div className="devices-container">

<div className="d-flex justify-content-between align-items-center mb-4">

<h3>My Home Devices</h3>

<button
className="btn btn-primary add-device-btn"
onClick={() => setShow(true)}
>
+ Add Device
</button>

</div>


<div className="device-grid">

{enrolledDevices.length === 0 && (
<p className="text-muted">No devices connected</p>
)}

{enrolledDevices.map((device) => (

<div className="device-card" key={device.enDevID}>

<div className="device-icon">
{getDeviceIcon(device.type)}
</div>

<div className="device-name">
{device.enDevName}
</div>

<div className="device-room">
{device.type} • {device.model}
</div>

<div className="d-flex justify-content-between align-items-center mt-3">

<span>
{device.enrolledStatus === "enabled" ? "On" : "Off"}
</span>

<label className="switch">

<input
type="checkbox"
checked={device.enrolledStatus === "enabled"}
onChange={() => toggleStatus(device.enDevID)}
/>

<span className="slider"></span>

</label>

</div>

<button
className="btn btn-danger btn-sm mt-3"
onClick={() => handleDelete(device.enDevID)}
>
Remove
</button>

</div>

))}

</div>


<Modal show={show} onHide={() => setShow(false)} centered>

<form onSubmit={handleSubmitButton}>

<Modal.Header closeButton>
<Modal.Title>Add New Device</Modal.Title>
</Modal.Header>

<Modal.Body>

<input
className="form-control mb-3"
placeholder="Device Name"
name="enDevName"
value={deviceFormData.enDevName}
onChange={handleChange}
required
/>

<select
className="form-select mb-3"
name="type"
value={deviceFormData.type}
onChange={handleChange}
required
>

<option value="">Select Device Type</option>

{deviceTypes.map((type,index) => (
<option key={index}>{type}</option>
))}

</select>


<select
className="form-select"
name="model"
value={deviceFormData.model}
onChange={handleChange}
required
>

<option value="">Select Model</option>

{deviceModels.map((model,index) => (
<option key={index}>{model}</option>
))}

</select>

</Modal.Body>

<Modal.Footer>

<button
className="btn btn-secondary"
type="button"
onClick={() => setShow(false)}
>
Cancel
</button>

<button className="btn btn-primary" type="submit">
Add Device
</button>

</Modal.Footer>

</form>

</Modal>

</div>

);

};

export default Devices;