import React from "react";
import "./Navbar.css";
import "./logo.css"
import logo from "../assets/logo.png"; 
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="p-2 custom-navbar">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          {/* Brand + Nav links */}
          <div className="d-flex align-items-center">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none me-3 nav-color fw-bold hov"
            >
        <img  className="logo"  src={logo} alt="medilocator" style={{ height: "50px", width: "60px" }} />


            </a>

            <ul className="nav mb-2 mb-lg-0">
              <li>
                <a href="#" className="px-2  nav-color nav-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="nav-link nav-color px-2">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="nav-link nav-color px-2 ">
                  Support 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Search + Buttons aligned right */}
          <div className="d-flex align-items-center ms-auto">
            <form className="me-2" role="search">
              <input
                type="search"
                className="form-control form-control-sm search-input"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <button
              type="button"
              className="btn btn-teal text-white btn-outline-teal btn-sm me-2"
               onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              type="button"
              className="btn btn-teal btn-sm"
              onClick={() => navigate("/signup")}
            >
              Signup

            </button>

              <button style={{marginLeft : "8px"}}
              type="button"
              className="btn btn-teal btn-sm"
              onClick={() => navigate("/admin")}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
