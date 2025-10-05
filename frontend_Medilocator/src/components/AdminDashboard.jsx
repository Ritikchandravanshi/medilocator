
import React from "react";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
   {<AdminSidebar/>}
      <div className="admin-main">
        <h1 className="admin-title">Welcome to MediLocator Admin Panel</h1>
        <p className="admin-subtitle">Manage your products and stores efficiently.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
