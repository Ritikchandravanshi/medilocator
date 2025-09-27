import React from 'react';
import Medicine_card from './medicine_card';
import './medicine_card.css';

function Detail() {
  return (
    <div className="container mt-4">
      <div className="row g-2"> {/* g-2 = smaller gap between columns */}
        <div className="col-6 col-md-4 col-lg-3">
          <Medicine_card />
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <Medicine_card />
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <Medicine_card />
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <Medicine_card />
        </div>
      </div>
    </div>
  );
}

export default Detail;
