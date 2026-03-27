import { useState, useEffect } from "react";
import axios from "axios";
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
model: ""
});


/* ================= LOAD DEVICES FROM DB ================= */

useEffect(() => {

const loadDevices = async () => {

const user = JSON.parse(localStorage.getItem("user"));
if (!user) return;

try {

const res = await axios.get(
`http://localhost:8081/device/user/${user.id}`
);

setEnrolledDevices(res.data);

} catch (err) {
console.log("Error loading devices:", err);
}

setIsLoading(false);
};

loadDevices();

}, []);


/* ================= INPUT CHANGE ================= */

const handleChange = (e) => {
setDeviceFormData({
...deviceFormData,
[e.target.name]: e.target.value
});
};


/* ================= ADD DEVICE ================= */

const handleSubmitButton = async (e) => {

e.preventDefault();

const user = JSON.parse(localStorage.getItem("user"));

const newDevice = {
name: deviceFormData.enDevName,
type: deviceFormData.type,
model: deviceFormData.model,
status: "enabled"
};

try {

const res = await axios.post(
`http://localhost:8081/device/add/${user.id}`,
newDevice
);

// UI update
setEnrolledDevices(prev => [...prev, res.data]);

} catch (err) {
console.log("Error adding device:", err);
}

setDeviceFormData({
enDevName: "",
type: "",
model: ""
});

setShow(false);
};


/* ================= DELETE DEVICE ================= */

const handleDelete = async (id) => {

try {

await axios.delete(`http://localhost:8081/device/${id}`);

setEnrolledDevices(prev =>
prev.filter(device => device.id !== id)
);

} catch (err) {
console.log("Error deleting:", err);
}

};


/* ================= TOGGLE (UI ONLY) ================= */

const toggleStatus = (id) => {

setEnrolledDevices(prev =>
prev.map(device =>
device.id === id
? {
...device,
status:
device.status === "enabled"
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
case "Light": return <FaLightbulb/>
case "Fan": return <FaFan/>
case "AC": return <FaSnowflake/>
case "TV": return <FaTv/>
default: return "🔌"
}
};


if (isLoading) return <InnerLoadingPage />;


return (

<div className="devices-container">

<div className="d-flex justify-content-between align-items-center mb-4">
<h3>My Home Devices</h3>

<button className="btn btn-primary" onClick={() => setShow(true)}>
+ Add Device
</button>

</div>


<div className="device-grid">

{enrolledDevices.length === 0 ? (
<p>No devices connected</p>
) : (

enrolledDevices.map((device) => (

<div className="device-card" key={device.id}>

<div className="device-icon">
{getDeviceIcon(device.type)}
</div>

<div className="device-name">
{device.name}
</div>

<div className="device-room">
{device.type} • {device.model}
</div>

<div className="d-flex justify-content-between mt-3">

<span>
{device.status === "enabled" ? "On" : "Off"}
</span>

<label className="switch">
<input
type="checkbox"
checked={device.status === "enabled"}
onChange={() => toggleStatus(device.id)}
/>
<span className="slider"></span>
</label>

</div>

<button
className="btn btn-danger btn-sm mt-3"
onClick={() => handleDelete(device.id)}
>
Remove
</button>

</div>

))

)}

</div>


{/* MODAL */}

<Modal show={show} onHide={() => setShow(false)} centered>

<form onSubmit={handleSubmitButton}>

<Modal.Header closeButton>
<Modal.Title>Add Device</Modal.Title>
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
<option value="">Select Type</option>
{deviceTypes.map((t,i) => <option key={i}>{t}</option>)}
</select>

<select
className="form-select"
name="model"
value={deviceFormData.model}
onChange={handleChange}
required
>
<option value="">Select Model</option>
{deviceModels.map((m,i) => <option key={i}>{m}</option>)}
</select>

</Modal.Body>

<Modal.Footer>

<button className="btn btn-secondary" onClick={() => setShow(false)}>
Cancel
</button>

<button className="btn btn-primary" type="submit">
Add
</button>

</Modal.Footer>

</form>

</Modal>

</div>

);

};

export default Devices;