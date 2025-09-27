import React from 'react';

function Medicine_card() {
  return (
   <div class="container my-4 d-flex justify-content-center">
  <div class="product-card shadow-sm single-card">
    <img src="https://via.placeholder.com/250x250.png?text=Product+Image" class="product-img" alt="AHAGLOW S Face Wash"/>

    <div class="product-title">AHAGLOW S FOAMING Face Wash 100ml</div>
    <div class="product-brand">By Ahaglow</div>

    <div class="d-flex align-items-center">
      <div class="price">₹613.66</div>
      <div class="discount">23% OFF</div>
    </div>

    <div class="mrp">MRP ₹798.00</div>
    <div class="delivery">Delivery: <strong>Sun, 28 Sep</strong></div>
    <div class="volume">100 ml</div>

    <button class="btn add-btn w-100">Add +</button>
  </div>
</div>


  );
}

export default Medicine_card;
