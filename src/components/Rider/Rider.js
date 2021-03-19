import './Rider.css';
import React from 'react';
import { RiPinDistanceFill } from "react-icons/ri";
import { HiCurrencyDollar } from "react-icons/hi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

function Rider({ vehicle, rider}) {
  const { away, price, availableSeat} = rider;
  return (
    <div className="Rider">
      <div className="card card-body w-100 mx-0">
        <div className="row align-items-center justify-content-between px-2">
          <img src={vehicle} alt="" className="w-25" />
          <h5><RiPinDistanceFill /> {away}</h5>
          <h5><MdAirlineSeatReclineNormal />{availableSeat}</h5>
          <h5><HiCurrencyDollar /> {price}$</h5>
        </div>
      </div>
    </div>
  )
}

export default Rider;
