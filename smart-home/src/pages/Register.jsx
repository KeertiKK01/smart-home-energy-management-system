import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import smartHomeImage from "../assets/RegisterImage.jpg";
import smartHomeIcon from "../assets/logo.png";


const Register = () => {

const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
phone: "",
email: "",
password: "",
confirmPassword: "",
streetNum: "",
street: "",
unit: "",
city: "",
state: "",
zipcode: "",
country: ""
});

const [passwordNotMatch, setPasswordNotMatch] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [message, setMessage] = useState("Register Your Information Below");


/* ================= INPUT CHANGE ================= */

const handleChange = (e) => {

setFormData({
...formData,
[e.target.name]: e.target.value
});

};


/* ================= PASSWORD CHECK ================= */

const checkPasswordsMatch = () => {

if (formData.password !== formData.confirmPassword) {
setPasswordNotMatch(true);
setMessage("Password Mismatch");
} else {
setPasswordNotMatch(false);
setMessage("");
}

};


/* ================= SHOW PASSWORD ================= */

const handleShowPassword = () => {
setShowPassword(!showPassword);
};


/* ================= REGISTER ================= */

const handleSubmit = async (e) => {

e.preventDefault();

if (formData.password !== formData.confirmPassword) {
setPasswordNotMatch(true);
return;
}

try {

await axios.post(
"http://localhost:8081/auth/register",
{
name: formData.name,
email: formData.email,
password: formData.password,
phone: formData.phone
}
);


/* ================= STORE USER DATA ================= */

const userData = {

name: formData.name,
phone: formData.phone,
email: formData.email,

address:{
streetNum: formData.streetNum,
street: formData.street,
unit: formData.unit,
city: formData.city,
state: formData.state,
zipcode: formData.zipcode,
country: formData.country
},

loggedIn:true

};

localStorage.setItem("user", JSON.stringify(userData));

alert("OTP sent to your email");


/* ================= NAVIGATE OTP ================= */

navigate("/otp", {
state: { email: formData.email }
});

} catch (error) {

if (error.response) {
alert(error.response.data);
} else {
alert("Server error");
}

}

};


/* ================= UI ================= */

return (

<div className="register-wrapper">

<div className="register-container">


{/* LEFT IMAGE */}

<div className="register-left">
<img src={smartHomeImage} alt="Smart Home"/>
</div>


{/* RIGHT FORM */}

<div className="register-right">
<div className = "register-icon-container">
    <img src={smartHomeIcon}
        alt="Smart Home"
            className="register-icon"
        />
</div>

<div className="brand-bar">

<span> Smart Energy Management System</span>
</div>

<h3 className="form-title">
Create An Account
</h3>

<p className={passwordNotMatch ? "error-text" : "success-text"}>
{message}
</p>

<form onSubmit={handleSubmit}>


<div className="row-2">

<input
type="text"
placeholder="Full Name"
name="name"
value={formData.name}
onChange={handleChange}
required
/>

<input
type="text"
placeholder="Phone Number"
name="phone"
value={formData.phone}
onChange={handleChange}
required
/>

</div>


<input
type="email"
placeholder="Email"
name="email"
value={formData.email}
onChange={handleChange}
required
/>


<div className="row-2">

<div className="password-box">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
name="password"
value={formData.password}
onChange={handleChange}
onBlur={checkPasswordsMatch}
required
/>

<span className="eye-icon" onClick={handleShowPassword}>
👁
</span>

</div>


<div className="password-box">

<input
type={showPassword ? "text" : "password"}
placeholder="Repeat Password"
name="confirmPassword"
value={formData.confirmPassword}
onChange={handleChange}
onBlur={checkPasswordsMatch}
required
/>

<span className="eye-icon" onClick={handleShowPassword}>
👁
</span>

</div>

</div>


<div className="row-3">

<input
type="text"
placeholder="Street #"
name="streetNum"
value={formData.streetNum}
onChange={handleChange}
/>

<input
type="text"
placeholder="Street"
name="street"
value={formData.street}
onChange={handleChange}
/>

<input
type="text"
placeholder="Unit"
name="unit"
value={formData.unit}
onChange={handleChange}
/>

</div>


<div className="row-3">

<input
type="text"
placeholder="City"
name="city"
value={formData.city}
onChange={handleChange}
/>

<input
type="text"
placeholder="State"
name="state"
value={formData.state}
onChange={handleChange}
/>

<input
type="text"
placeholder="Zip Code"
name="zipcode"
value={formData.zipcode}
onChange={handleChange}
/>

</div>


<input
type="text"
placeholder="Country"
name="country"
value={formData.country}
onChange={handleChange}
/>


<button type="submit" className="register-btn">
Register Account
</button>

</form>


<p className="login-link">
Already have an account?
<a href="/login"> Login!</a>
</p>

</div>

</div>

</div>

);

};

export default Register;