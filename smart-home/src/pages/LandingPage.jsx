import { Link } from "react-router-dom";
import { useState } from "react";
import "./LandingPage.css";
import logo from "../assets/logo.png";

const LandingPage = () => {

const [contact, setContact] = useState({
name: "",
email: "",
message: ""
});

const handleChange = (e) => {
setContact({
...contact,
[e.target.name]: e.target.value
});
};

const handleSubmit = (e) => {
e.preventDefault();

if (!contact.name || !contact.email || !contact.message) {
alert("Please fill all fields");
return;
}

alert("Message Sent Successfully!");

setContact({
name: "",
email: "",
message: ""
});
};

const [activeFAQ, setActiveFAQ] = useState(null);

const toggleFAQ = (index) => {
setActiveFAQ(activeFAQ === index ? null : index);
};

return (

<div className="landing-container">

{/* NAVBAR */}
<nav className="landing-navbar">

<div className="logo">

<img
src={logo}
alt="Smart Energy Logo"
className="logo-image"
/>

<span>Smart Home Energy Management System</span>

</div>

<div className="nav-links">
<a href="#about">About</a>
<a href="#features">Features</a>
<a href="#difference">Why Us</a>
<a href="#faq">FAQ</a>
<a href="#contact">Contact</a>
</div>

<div className="auth-buttons">
<Link to="/login" className="login-btn">Login</Link>
<Link to="/register" className="register-btn">Register</Link>
</div>

</nav>

{/* HERO SECTION */}
<section className="hero">

<h1>Control Your Energy. Power Your Smart Home.</h1>

<p>
Monitor devices, analyze energy consumption, reduce electricity cost,
and manage your entire smart home ecosystem through one intelligent dashboard.
</p>

<div className="hero-buttons">
<Link to="/register" className="primary-btn">Get Started</Link>
<Link to="/login" className="secondary-btn">Login</Link>
</div>

</section>

{/* ABOUT */}
<section id="about" className="about-section">

<h2>About Us</h2>

<div className="about-wrapper">

<div className="about-card">

<div className="about-icon">
<i className="fas fa-bolt"></i>
</div>

<p>
The Smart Energy Management System helps homeowners monitor,
control and optimize electricity usage using smart devices
and intelligent analytics.
</p>

<p>
Users can track energy usage, identify high consumption devices,
and manage multiple service locations through a powerful dashboard.
</p>

</div>

</div>

</section>

{/* FEATURES */}
<section id="features" className="section features">

<h2>Core Features</h2>

<div className="feature-grid">

<div className="feature-card">
⚡
<h3>Real-Time Monitoring</h3>
<p>Track electricity usage instantly.</p>
</div>

<div className="feature-card">
📊
<h3>Energy Analytics</h3>
<p>Visualize energy consumption with charts.</p>
</div>

<div className="feature-card">
🏠
<h3>Device Management</h3>
<p>Control smart devices from one dashboard.</p>
</div>

<div className="feature-card">
💰
<h3>Cost Optimization</h3>
<p>Reduce electricity bills with smart insights.</p>
</div>

</div>

</section>

{/* WHAT MAKES US DIFFERENT */}
<section id="difference" className="section difference">

<h2>What Makes Us Different</h2>

<div className="difference-grid">

<div className="difference-card">
🔍
<h3>Smart Insights</h3>
<p>
Our system analyzes energy patterns and provides
intelligent suggestions to reduce electricity usage.
</p>
</div>

<div className="difference-card">
⚙️
<h3>Automation</h3>
<p>
Automatically control devices based on schedules
and energy consumption behavior.
</p>
</div>

<div className="difference-card">
🌍
<h3>Eco Friendly</h3>
<p>
Reduce carbon footprint by optimizing electricity
usage and promoting sustainable living.
</p>
</div>

<div className="difference-card">
📱
<h3>All-in-One Dashboard</h3>
<p>
Manage all smart home devices, energy analytics,
and billing insights from one platform.
</p>
</div>

</div>

</section>

{/* FAQ */}
<section id="faq" className="section faq">

<h2>Frequently Asked Questions</h2>

<div className="faq-container">

<div className="faq-item" onClick={() => toggleFAQ(1)}>
<h4>What is Smart Energy Management System?</h4>
{activeFAQ === 1 && (
<p>
It is a platform designed to monitor and optimize
electricity usage in smart homes.
</p>
)}
</div>

<div className="faq-item" onClick={() => toggleFAQ(2)}>
<h4>Can I monitor multiple locations?</h4>
{activeFAQ === 2 && (
<p>
Yes, the system allows users to manage multiple service
locations from a single dashboard.
</p>
)}
</div>

<div className="faq-item" onClick={() => toggleFAQ(3)}>
<h4>Is my data secure?</h4>
{activeFAQ === 3 && (
<p>
Yes, all user data is securely managed with authentication
and validation.
</p>
)}
</div>

</div>

</section>

{/* CONTACT */}
<section id="contact" className="section contact">

<h2>Contact Us</h2>

<form className="contact-form" onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Your Name"
value={contact.name}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Your Email"
value={contact.email}
onChange={handleChange}
/>

<textarea
name="message"
placeholder="Your Message"
value={contact.message}
onChange={handleChange}
></textarea>

<button type="submit">Send Message</button>

</form>

</section>

{/* FOOTER */}
<footer className="landing-footer">

<div className="footer-grid">

<div>
<h3>Smart Home Energy Management System</h3>
<p>Smart energy control for modern homes.</p>
</div>

<div>
<h4>Quick Links</h4>
<ul>
<li><a href="#about">About</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#difference">Why Us</a></li>
<li><a href="#faq">FAQ</a></li>
<li><a href="#contact">Contact</a></li>
</ul>
</div>

<div>
<h4>Contact</h4>
<p>Email: support@smarthome.com</p>
<p>Phone: +91 9876543210</p>

<div className="social-icons">

<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
<i className="fab fa-facebook"></i>
</a>

<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
<i className="fab fa-twitter"></i>
</a>

<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
<i className="fab fa-linkedin"></i>
</a>

<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
<i className="fab fa-instagram"></i>
</a>

</div>

</div>

</div>

<p className="copyright">
© 2026 Smart Energy Management System | Developed by <b>Keerti Kushwaha</b>
</p>

</footer>

</div>
);
};

export default LandingPage;