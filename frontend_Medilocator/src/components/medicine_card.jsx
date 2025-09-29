import React from "react";
import "./medicine_card.css";
import { useNavigate } from "react-router-dom";




function MedicineCard() {
  const navigate = useNavigate();
  return (
    <div className="medicine-card" onClick={()=>navigate("/medicineDetails")}>
      <div className="medicine-header">
        <h2 className="medicine-name">Dolo 650mg Strip Of 15 Tablets</h2>
        <p className="medicine-brand">By Cipla Ltd</p>
      </div>

      <p className="medicine-quantity">15 Tablet(s) in Strip</p>

      <div className="medicine-pricing">
        <span className="medicine-price">₹23.45*</span>
        <span className="medicine-mrp">₹32.13</span>
        <span className="medicine-discount">27% OFF</span>
      </div>

      <button className="medicine-btn">Add to Cart</button>
    </div>
  );
}

export default MedicineCard;
