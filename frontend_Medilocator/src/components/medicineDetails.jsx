import React, { useState } from "react";
import "./medicineDetails.css"
 

function MedicineDetails() {
const images = [
  "https://images.unsplash.com/photo-1588776814546-4cfe9e51c6a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80", // tablets
  "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80", // pill bottle
  "https://images.unsplash.com/photo-1611078489935-0cb964de46d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"  // medicine strips
];



  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="medicine-card-container">
      {/* Left Side - Images */}
      <div className="medicine-image-section">
        <img src={mainImage} alt="Medicine" className="main-image" />

        <div className="thumbnail-row">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`thumbnail ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Details */}
      <div className="medicine-details">
        <h2 className="medicine-title">Dolo 650 Tablet</h2>
        <p className="medicine-brand">By MICRO LABS</p>
        <p className="medicine-quantity">15 Tablet(s) in Strip</p>

        <div className="medicine-price-row">
          <span className="price">₹23.45*</span>
          <span className="mrp">₹32.13</span>
          <span className="discount">27% OFF</span>
        </div>

        <p className="per-tablet">₹1.56/tablet (Inclusive of all taxes)</p>

        <button className="add-to-cart">Add To Cart</button>

        
        <p className="offer">*Offer applicable on order above ₹1000</p>
      </div>
    </div>
  );
}

export default MedicineDetails;
