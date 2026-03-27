import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import smartHomeImage from "../assets/LoginImage.jpg";
import smartHomeIcon from "../assets/logo.png";
import "./Login.css";

const Login = () => {

const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
email: "",
password: ""
});

const [message, setMessage] = useState("");

/* ================= AUTO LOGIN CHECK ================= */

useEffect(() => {

try {

const storedUser = JSON.parse(localStorage.getItem("user"));

if (storedUser && storedUser.id) {
navigate("/dashboard/overview");
}

} catch (error) {
console.log("User parse error");
}

}, [navigate]);

/* ================= INPUT CHANGE ================= */

const handleChange = (e) => {

setFormData({
...formData,
[e.target.name]: e.target.value
});

};

/* ================= LOGIN SUBMIT ================= */

const handleSubmit = async (e) => {

e.preventDefault();
setMessage("");

if (!formData.email || !formData.password) {
setMessage("Please enter email and password");
return;
}

try {

const response = await axios.post(
"http://localhost:8081/auth/login",
{
email: formData.email,
password: formData.password
}
);

/* ================= LOGIN SUCCESS ================= */

const user = response.data;

/* 🔥 FIX: Normalize email (VERY IMPORTANT) */
const normalizedUser = {
...user,
email: user.email.trim().toLowerCase()
};

/* 🔥 DEBUG (optional but useful) */
console.log("Logged User:", normalizedUser);

/* ✅ SAVE USER ONLY (DO NOT CLEAR STORAGE) */
localStorage.setItem("user", JSON.stringify(normalizedUser));

navigate("/dashboard/overview");

} catch (error) {

if (error.response && typeof error.response.data === "string") {
setMessage(error.response.data);
} else {
setMessage("Server Error. Try again.");
}

}

};

return (

<div className="login-wrapper">

<div className="login-container">

<div className="login-left">
<img src={smartHomeImage} alt="Smart Home"/>
</div>

<div className="login-right">

<div className="login-icon-container">
<img
src={smartHomeIcon}
alt="Smart Home"
className="login-icon"
/>
</div>

<div className="brand-bar">
<span>Smart Energy Management System</span>
</div>

<h3 className="form-title">Welcome Back!</h3>

<form onSubmit={handleSubmit}>

<input
type="email"
name="email"
placeholder="Enter Email"
value={formData.email}
onChange={handleChange}
required
/>

<div className="password-box">

<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Enter Password"
value={formData.password}
onChange={handleChange}
required
/>

<span
className="eye-icon"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? "🙈" : "👁"}
</span>

</div>

<div className="forgot-login-container">

<button
type="button"
className="forgot-btn"
onClick={() => navigate("/forgot-password")}
>
Forgot Password?
</button>

</div>

<button type="submit" className="login-btn">
Login
</button>

{message && (
<p className="error-text">
{message}
</p>
)}

</form>

<p className="create-link">

Don't have an account?

<span onClick={() => navigate("/register")}>
Create an Account!
</span>

</p>

</div>

</div>

</div>

);

};

export default Login;