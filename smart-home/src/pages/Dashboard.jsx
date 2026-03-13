import { useEffect, useState } from "react";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Title,
Tooltip,
Legend
);

const Dashboard = () => {

const [userName,setUserName] = useState("User");
const [devices,setDevices] = useState([]);

const [totalDevices,setTotalDevices] = useState(0);
const [activeDevices,setActiveDevices] = useState(0);
const [totalEnergy,setTotalEnergy] = useState(0);
const [monthlyCost,setMonthlyCost] = useState(0);
const [yearlyCost,setYearlyCost] = useState(0);


/* ================= LOAD USER + DEVICE DATA ================= */

useEffect(()=>{

const storedUser = JSON.parse(localStorage.getItem("user"));

if(storedUser){
setUserName(storedUser.name);
}

const deviceList = JSON.parse(localStorage.getItem("devices")) || [];

setDevices(deviceList);

calculateEnergy(deviceList);

},[]);



/* ================= ENERGY CALCULATION ================= */

const calculateEnergy = (deviceList) => {

setTotalDevices(deviceList.length);

const active = deviceList.filter(
d => d?.enrolledStatus === "enabled"
);

setActiveDevices(active.length);

let energySum = 0;

deviceList.forEach(device => {

const power = device?.power || 100;
const hours = device?.hours || 5;

energySum += (power * hours) / 1000;

});

const total = Number(energySum.toFixed(2));

setTotalEnergy(total);

const rate = 8;

setMonthlyCost((total * 30 * rate).toFixed(2));
setYearlyCost((total * 365 * rate).toFixed(2));

};



/* ================= CHART DATA ================= */

const dailyChart = {
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[
{
label:"Daily Energy (kWh)",
data:[2.1,2.5,2.0,2.7,2.4,2.6,2.2],
backgroundColor:"#4e73df"
}
]
};

const monthlyChart={
labels:["Jan","Feb","Mar","Apr","May","Jun"],
datasets:[
{
label:"Monthly Energy (kWh)",
data:[60,72,68,75,70,80],
backgroundColor:"#1cc88a"
}
]
};

const yearlyChart={
labels:["2022","2023","2024","2025","2026"],
datasets:[
{
label:"Yearly Energy (kWh)",
data:[700,760,820,900,950],
borderColor:"#f6c23e",
backgroundColor:"#f6c23e"
}
]
};



/* ================= UI ================= */

return(

<div className="dashboard-container container-fluid">

{/* Welcome */}

<div className="welcome-box mb-4">
<h2>Welcome back {userName} 👋</h2>
<p>Your smart home energy overview</p>
</div>


{/* Stats */}

<div className="row g-4 mb-4">

<div className="col-md-3">
<div className="card dashboard-card">
<h6>Connected Devices</h6>
<h3>{totalDevices}</h3>
</div>
</div>

<div className="col-md-3">
<div className="card dashboard-card">
<h6>Active Devices</h6>
<h3>{activeDevices}</h3>
</div>
</div>

<div className="col-md-3">
<div className="card dashboard-card">
<h6>Total Energy</h6>
<h3>{totalEnergy} kWh</h3>
</div>
</div>

<div className="col-md-3">
<div className="card dashboard-card">
<h6>Today's Energy</h6>
<h3>{(totalEnergy/2).toFixed(2)} kWh</h3>
</div>
</div>

</div>


{/* Cost */}

<div className="row g-4 mb-4">

<div className="col-md-6">
<div className="card cost-card">
<h6>Monthly Electricity Cost</h6>
<h2>₹ {monthlyCost}</h2>
</div>
</div>

<div className="col-md-6">
<div className="card cost-card">
<h6>Yearly Electricity Cost</h6>
<h2>₹ {yearlyCost}</h2>
</div>
</div>

</div>


{/* Device Status */}

<h4 className="section-title">Live Device Status</h4>

<div className="row g-4 mb-4">

{devices.length === 0 ? (
<p className="text-muted">No devices added yet</p>
) : (

devices.map((device,index)=>{

const deviceName =
device?.enDevName ||
device?.deviceName ||
device?.name ||
device?.type ||
"Smart Device";

const power = device?.power || 100;
const hours = 5;

const energy = ((power * hours)/1000).toFixed(2);
const energyPercent = Math.min(energy * 100,100);

const status = device?.enrolledStatus === "enabled";

const name = deviceName.toLowerCase();

const icon =
name.includes("light") ? "💡" :
name.includes("fan") ? "🌀" :
name.includes("ac") ? "❄️" :
name.includes("tv") ? "📺" :
name.includes("fridge") ? "🧊" :
"🔌";

return(

<div className="col-md-3" key={index}>

<div className={`device-card ${status ? "active":"off"}`}>

<div className="device-header">

<h6 className="device-name">
{icon} {deviceName}
</h6>

<span className={`status-dot ${status ? "online":"offline"}`}></span>

</div>

<p className="device-status">
{status ? "Running":"Turned Off"}
</p>

<div className="energy-meter">
<span className="energy-value">{energy} kWh</span>
</div>

<div className="energy-bar">
<div
className={`energy-fill ${status ? "energy-on":"energy-off"}`}
style={{width:`${energyPercent}%`}}
></div>
</div>

</div>

</div>

)

})

)}

</div>


{/* Charts */}

<div className="row g-4 mb-4">

<div className="col-md-4">
<div className="card chart-card">
<h6>Daily Energy Usage</h6>
<Bar data={dailyChart}/>
</div>
</div>

<div className="col-md-4">
<div className="card chart-card">
<h6>Monthly Energy Usage</h6>
<Bar data={monthlyChart}/>
</div>
</div>

<div className="col-md-4">
<div className="card chart-card">
<h6>Yearly Energy Usage</h6>
<Line data={yearlyChart}/>
</div>
</div>

</div>

</div>

);

};

export default Dashboard;