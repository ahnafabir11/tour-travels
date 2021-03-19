import './Home.css';
import React from 'react';
import { useHistory } from 'react-router';
import vehicleData from '../../fakeData/vehicleData';
import VehicleCard from '../VehicleCard/VehicleCard';

const Home = ()=> {
  const history = useHistory();

  const selectVehicle = (vehicleName)=> {
    history.push(`/destination/${vehicleName}`);
  }

  return (
    <div className="Home">
      <h1 className="custom-title-text">Travel Everywhere</h1>
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