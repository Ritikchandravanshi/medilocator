// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="detail">
        <Outlet /> {/* 👈 This is where child routes will appear */}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
