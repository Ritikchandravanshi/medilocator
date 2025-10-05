
import React from "react";
import StoreSidebar from "../components/StoreSidebar";
import "./StoreDashboard.css";

const StoreDashboard = () => {
  const inventory = [
    { id: 1, name: "Dolo 650mg", stock: 35, price: 24.99 },
    { id: 2, name: "Paracetamol 500mg", stock: 80, price: 18.25 },
    { id: 3, name: "Amoxicillin 250mg", stock: 50, price: 65.75 },
    { id: 4, name: "Pantoprazole 40mg", stock: 60, price: 55.3 },
    { id: 5, name: "Cetirizine 10mg", stock: 120, price: 20.0 },
  ];

  return (
    <div className="store-container">
      <StoreSidebar />
      <div className="store-main">
        <h1 className="store-title">Welcome to MediLocator Store Dashboard</h1>
        <p className="store-subtitle">
          Manage your inventory and search from the central catalog.
        </p>

        <div className="inventory-section">
          <h2>My Inventory</h2>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Stock</th>
                <th>Price (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>
                    <button className="update-btn">Update</button>
                    <button className="remove-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
