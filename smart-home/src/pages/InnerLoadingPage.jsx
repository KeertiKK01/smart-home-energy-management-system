import React from "react";

const InnerLoadingPage = () => {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f5f7fa,#e4e8f0)"
      }}
    >

      {/* Smart Energy Icon */}

      <div
        className="rounded-circle d-flex justify-content-center align-items-center mb-4 shadow"
        style={{
          width: "120px",
          height: "120px",
          background: "#ffffff"
        }}
      >
        <span style={{ fontSize: "55px" }}>⚡</span>
      </div>

      {/* Loading Text */}

      <h2
        className="text-primary mb-3"
        style={{
          fontFamily: "Mogra, Ribeye, sans-serif",
          letterSpacing: "1px"
        }}
      >
        Smart Energy System
      </h2>

      <p className="text-muted mb-4">
        Loading your dashboard...
      </p>

      {/* Spinner */}

      <div
        className="spinner-border text-secondary mb-4"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      {/* Progress Bar */}

      <div className="progress" style={{ width: "300px", height: "8px" }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
          style={{ width: "100%" }}
        ></div>
      </div>

    </div>
  );
};

export default InnerLoadingPage;