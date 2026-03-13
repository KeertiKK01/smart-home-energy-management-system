import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-white sticky-footer">
        <div className="container my-auto">
          <div className="text-center my-auto copyright" style={{ fontFamily: "Mogra, Ribeye, sans-serif"}}>
            <span>© 2026 Smart Energy Management System | Developed by <b>Keerti Kushwaha</b></span>
          </div>
        </div>
      </footer>
      <a className="border rounded d-inline scroll-to-top" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
};

export default Footer;
