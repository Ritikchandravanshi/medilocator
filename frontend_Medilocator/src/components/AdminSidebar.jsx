import React from "react";
import { FaBox, FaStore, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import "./AdminSidebar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";


const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-logo" onClick={()=>navigate("/admin")}>
        <img
          className="sidebar-logo-img"
          src={logo}
          alt="medilocator"
        />

        <h2>MediLocator</h2>
      </div>

      <ul className="sidebar-menu">
        <li onClick={()=>navigate("/admin/catalog")}>
          <FaBox className="icon" /> Product Catalog
        </li>
        <li onClick={()=>navigate("/store")}>
          <FaStore className="icon" /> Store Management
        </li>
        <li>
          <FaPlusCircle className="icon" /> Add Product
        </li>
        <li className="logout" onClick={()=>navigate("/")}>
          <FaSignOutAlt className="icon" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
