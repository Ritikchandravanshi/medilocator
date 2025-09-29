import React, { useState } from "react";
import "./medicineDetails.css"
 

function MedicineDetails() {
const images = [
  "https://images.unsplash.com/photo-1588776814546-4cfe9e51c6a1?crop=entropy&cs=tinysrgb&fit=crop&h=300&w=300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://media.istockphoto.com/id/1557062556/photo/manufacturing-date-and-expiry-date-on-some-pharmaceutical-packaging.jpg?s=1024x1024&w=is&k=20&c=uz8nuyTOvjfuO2XA0CCtKmeb-tjMpNK8hN2GPNYeA4A="
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
