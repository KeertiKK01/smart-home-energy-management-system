import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Otp.css";

const Otp = () => {

const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email || "";

const [otp, setOtp] = useState("");
const [message, setMessage] = useState("Enter the OTP sent to your email");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {


e.preventDefault();

if (otp.length !== 6) {
  setMessage("Please enter a valid 6 digit OTP");
  return;
}

try {

  setLoading(true);

  const response = await axios.post(
    `http://localhost:8081/auth/verify?email=${email}&otp=${otp}`
  );

  if (response.data === "OTP Verified") {

    alert("Registration Successful!");

    navigate("/login");

  } else {

    setMessage("Invalid OTP");

  }

} catch (error) {

  setMessage("OTP verification failed");

} finally {

  setLoading(false);

}


};

return (


<div className="otp-container">

  <div className="otp-card">

    {/* LEFT IMAGE */}
    <div className="otp-left"></div>

    {/* RIGHT SIDE */}
    <div className="otp-right">

      <div className="otp-box">

        <div className="brand">
          Smart Home
        </div>

        <h2>OTP Verification</h2>

        <p className="otp-message">
          {message}
        </p>

        <p className="otp-email">
          Sent to: {email}
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6 Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <div className="resend">
          Didn't receive OTP? <span>Resend</span>
        </div>

      </div>

    </div>

  </div>

</div>

);

};

export default Otp;
