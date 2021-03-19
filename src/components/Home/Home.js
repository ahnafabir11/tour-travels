import './Home.css';
import React from 'react';
import vehicleData from '../../fakeData/vehicleData';
import VehicleCard from '../VehicleCard/VehicleCard';
import { useHistory } from 'react-router';


function Home() {
  let history = useHistory();
  const selectVehicle = (vehicleName)=> {
    history.push(`/destination/${vehicleName}`);
  }

  return (
    <div className="Home">
      <h1 className="display-1 text-center text-white pt-5">Travel Everywhere</h1>
      <h1 className="text-center text-white pb-5">Select One Vehicle</h1>
      <div className="container pt-5">
        <div className="card-container">
          {
            vehicleData.map((vehicle, idx) => 
              <VehicleCard 
                key={idx}  
                title={vehicle.title}
                imgUrl={vehicle.imgUrl}
                selectVehicle={selectVehicle}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home;