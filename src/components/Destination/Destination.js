import './Destination.css';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import vehicleData from '../../fakeData/vehicleData';
import { ImLocation } from "react-icons/im";
import { MdMyLocation } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import Rider from '../Rider/Rider';
import GoogleMap from './GoogleMap';
import SearchBox from '../SearchBox/SearchBox';

const Destination = ()=> {
  const {vehicleName} = useParams();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [riders, setRiders] = useState({
    isAvaiable: false,
    riderVehicle: '',
    availableRiders: [],
    pickFrom: '',
    pickTo: '',
    pickDate: new Date(),
    errorMessage: false,
  })

  const handleDateChange = (date)=> {
    setSelectedDate(date);
  };

  const handleDestination = (e)=> {
    const newRiders = {...riders};
    newRiders[e.target.name] = e.target.value;
    setRiders(newRiders);
  }

  const handleSearch = ()=> {
    if(riders.pickFrom !== '' && riders.pickTo !== '') {
      const selectedData = vehicleData.find((vehicle)=> vehicle.title === vehicleName);
      const newRiders = {...riders}
      newRiders['isAvaiable'] = true;
      newRiders['pickDate'] = selectedDate;
      newRiders['riderVehicle'] = selectedData.imgUrl;
      newRiders['availableRiders'] = selectedData.riders;
      newRiders['errorMessage'] = false;
      setRiders(newRiders);
    } else {
      const newRiders = {...riders};
      newRiders.errorMessage = true;
      setRiders(newRiders);
    }
  }

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-lg-4">
          <div className="destination-form mb-3">
            {!riders.isAvaiable ? 
              <SearchBox 
                handleDestination={handleDestination}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                handleSearch={handleSearch}
              />
              : 
              <div>
                <div className="destination-info">
                  <h4><ImLocation/> {riders.pickFrom}</h4>
                  <h4><MdMyLocation/> {riders.pickTo}</h4>
                  <h4><MdDateRange/> {riders.pickDate.toDateString()}</h4>
                </div>
                {riders.availableRiders.map((rider, idx)=>
                  <Rider
                    key={idx}
                    vehicle={riders.riderVehicle}
                    pickFrom={riders.pickFrom}
                    pickTo={riders.pickTo}
                    rider={rider}
                  />
                )}
              </div>
            }
            {riders.errorMessage && <p className='text-center text-danger'>Pick From or Pick To can't be empty</p>}
          </div>
        </div>
        <div className="col-lg-8 overflow-hidden map-container">
          <GoogleMap/>
        </div>
      </div>
    </div>
  )
}

export default Destination;