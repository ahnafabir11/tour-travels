import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    mapCenter: {
      lat: 22.34323478010199,
      lng: 91.78279289989045,
    }
  };

  render() {
    return (
      <Map 
        google={this.props.google}
        initialCenter={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng
        }}
      >
        <Marker></Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDxa45yL09j5Hf0mNBXTlkARcHqH9j780c')
})(MapContainer)

