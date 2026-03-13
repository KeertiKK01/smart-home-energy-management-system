import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import smartHomeIcon from "../assets/logo.png";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {

      await axios.post("http://localhost:8081/auth/send-otp", { email });

      navigate("/verify-otp", { state: { email } });

    } catch (error) {

      alert("Failed to send OTP");

    }

  };

  return (

    <div className="forgot-container">

      <div className="forgot-card">

        <img 
          src={smartHomeIcon} 
          alt="Smart Home Logo"
          className="home-icon"
        />

        <h1 className="main-title">
          Smart Home Energy Management System
        </h1>

        <h2 className="sub-title">
          Forgot Password
        </h2>

        <input
          type="email"
          className="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button 
          className="otp-btn"
          onClick={sendOtp}
        >
          Send OTP
        </button>

      </div>

    </div>

  );
}

export default ForgotPassword;