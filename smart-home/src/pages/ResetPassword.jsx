import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import smartHomeIcon from "../assets/logo.png";

function ResetPassword() {

const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");

const location = useLocation();
const navigate = useNavigate();

const email = location.state?.email;

const resetPassword = async () => {

if(!otp || !newPassword){
alert("Please fill all fields");
return;
}

try{

await axios.post("http://localhost:8081/auth/reset-password",{
email,
otp,
newPassword
});

alert("Password reset successful");

navigate("/login");

}catch(error){

alert("Invalid OTP or Error");

}

};

return(

<div className="reset-container">

<div className="reset-card">

<img
src={smartHomeIcon}
alt="Smart Home"
className="reset-icon"
/>

<h1 className="reset-main-title">
Smart Home Energy Management System
</h1>

<h2 className="reset-sub-title">
Reset Password
</h2>

<input
type="text"
placeholder="Enter OTP"
className="reset-input"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>

<input
type="password"
placeholder="Enter New Password"
className="reset-input"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>

<button
className="reset-btn"
onClick={resetPassword}
>
Reset Password
</button>

</div>

</div>

);

}

export default ResetPassword;