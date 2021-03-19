import bikeImg from '../images/bikeimg.png';
import carImg from '../images/carimg.png';
import planeImg from '../images/planeimg.png';
import trainImg from '../images/trainimg.png';

const vehicleData = [
  {
    title: 'Bike',
    imgUrl: bikeImg, 
    riders: [
      { away: '1 km', price: 21, availableSeat: 1},
      { away: '1.6 km', price: 19, availableSeat: 1 },
      { away: '1.8 km', price: 18, availableSeat: 1 },
    ]
  },
  {
    title: 'Car',
    imgUrl: carImg,
    riders: [
      { away: '0.5 km', price: 41, availableSeat: 4 },
      { away: '1 km', price: 36, availableSeat: 4 },
      { away: '1.5 km', price: 32, availableSeat: 4 },
    ]
  },
  {
    title: 'Plane',
    imgUrl: planeImg,
    riders: [
      { away: '3 km', price: 95, availableSeat: 32 },
      { away: '5 km', price: 85, availableSeat: 21 },
      { away: '9 km', price: 80, availableSeat: 17 },
    ]
  },
  {
    title: 'Train',
    imgUrl: trainImg,
    riders: [
      { away: '1 km', price: 52, availableSeat: 12 },
      { away: '1.6 km', price: 50, availableSeat: 19 },
      { away: '1.8 km', price: 47, availableSeat: 21 },
    ]
  }
]

export default vehicleData;