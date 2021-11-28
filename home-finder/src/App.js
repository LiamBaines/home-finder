import './App.css';
import Location from './location/Location.js';

import Wrap from './wrap/Wrap.js'

import fetchCoords from './maps/fetchCoords.js';

import React from 'react';

function beta(lat1, lon1, lat2, lon2) {

  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const λ1 = lon1 * Math.PI/180;
  const λ2 = lon2 * Math.PI/180;

  const y = Math.sin(λ2-λ1) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2)* Math.cos(λ2-λ1);
  const θ = Math.atan2(y, x);

  return (θ * 180 / Math.PI + 360) % 360
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [
        new Location("Buenos Aires", -34.6, -58.4),
        new Location("Vauxhall", 51.5, -0.12)
      ]
    }
  }

  async updateCoords() {
    for (let i = 0; i < this.state.locations.length; i++) {
      fetchCoords(this.state.locations[i].name).then(location => {
        this.setState((curr, props) => ({
          locations: curr.locations.map((item, j) => i === j ? new Location(this.state.locations[i].name, location.lat, location.lng) : item)
        }))
      })
    }
  }

  updateName(i, str) {
    this.setState((curr, props) => ({
      locations: curr.locations.map((location, j) => i === j ? new Location(str, location.lat, location.lng) : location)
    }))
  }

  addLocation() {
    this.setState(curr => ({
      locations: curr.locations.concat(new Location("", 0, 0))
    }))
  }

  render() {

    // let x = 51.4613;
    // let y = -0.1156;

    // console.log("beta(Brixton, Buenos Aires) = " + beta(x, y, -34.6037, -58.3816))
    // console.log("beta(Brixton, Vauxhall) = " + beta(x, y, 51.4862, -0.1217))    
    // console.log("beta(Brixton, New Delhi) = " + beta(x, y, 28.6139, 77.2090))    
    // console.log("beta(Brixton, Washington D.C.) = " + beta(x, y, 38.9072, -77.0369))    
    // console.log("beta(Brixton, Paris) = " + beta(x, y, 48.8566, 2.3522))    
    // console.log("beta(Brixton, Holloway) = " + beta(x, y, 51.5570, -0.1155))    
    // console.log("beta(Brixton, Cambridge) = " + beta(x, y, 52.2053, 0.1218))    
    // console.log("beta(Brixton, Madrid) = " + beta(x, y, 40.4168, -3.7038))        
    // console.log("beta(Brixton, Santiago) = " + beta(x, y, -33.4489, -70.6693)) 
    return (
        Wrap({
          locations: this.state.locations,
          addLocation: this.addLocation.bind(this),
          updateCoords: this.updateCoords.bind(this),
          updateName: this.updateName.bind(this)
        })
      );
  }

}

export default App;
