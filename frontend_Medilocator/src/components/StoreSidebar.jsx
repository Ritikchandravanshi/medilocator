import React from "react";
import {
  FaWarehouse,
  FaSearch,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./StoreSidebar.css";

const StoreSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate("/store")}>
        <img className="sidebar-logo-img" src={logo} alt="medilocator" />
        <h2>MediLocator</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/store" className="sidebar-link">
            <FaWarehouse className="icon" /> My Inventory
          </Link>
        </li>
        <li>
          <li>
            <Link to="/store/search" className="sidebar-link">
              🔍 Search from Catalog
            </Link>
          </li>
        </li>
        <li className="logout" onClick={() => navigate("/")}>
          <FaSignOutAlt className="icon" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default StoreSidebar;
