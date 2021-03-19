import './VehicleCard.css';
import React from 'react';

function VehicleCard({ title, imgUrl, selectVehicle}) {
  return (
    <div className="VehicleCard" onClick={() => selectVehicle(title)}>
      <div className="card vehicle-card">
        <img src={imgUrl} className="card-img-top w-50" alt="Bike" />
        <div className="card-body">
          <h3 className="card-text">{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard;