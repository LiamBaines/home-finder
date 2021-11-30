import './App.css';
import Location from './location/Location.js';

import Wrap from './wrap/Wrap.js'

import calculateBearing from './maps/calculateBearing.js';
import fetchCoords from './maps/fetchCoords.js';

import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [
        new Location("Brixton, London", 51.4613, -0.1156, 0),
        new Location("Buenos Aires, Argentina", -34.6037, -58.3816, 225.3122),
        new Location("Vauxhall, London", 51.4862, -0.1217, 351.3264),
        new Location("New Delhi, India", 28.6139, 77.209, 80.21),
        new Location("Washington DC, USA", 38.9072, -77.0369, 288.5),
        new Location("Paris, France", 48.8566, -2.3522, 147.79),
        new Location("Holloway, London", 51.5570, -0.1155, 0.03),
        new Location("Cambridge, UK", 52.2053, 0.1218, 11.06),
        new Location("Madrid, Spain", 40.4168, -3.7038, 194.05),
        new Location("Santiago, Chile", -33.4489, -70.6693, 234.52)
      ]
    }
  }

  async updateCoords() {
    for (let i = 0; i < this.state.locations.length; i++) {
      fetchCoords(this.state.locations[i].name).then(location => {
        this.setState((curr, props) => ({ 
          locations: curr.locations.map((item, j) => i === j ? new Location(item.name, location.lat, location.lng, calculateBearing(this.state.locations[0].lat, this.state.locations[0].lng, location.lat, location.lng)) : item)
        }))
      })
    }
  }

  updateName(i, str) {
    this.setState((curr, props) => ({
      locations: curr.locations.map((location, j) => i === j ? new Location(str, location.lat, location.lng, location.bearing) : location)
    }))
  }

  addLocation() {
    this.setState(curr => ({
      locations: curr.locations.concat(new Location("", 0, 0, 0))
    }))
  }

  render() {
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
