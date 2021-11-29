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
        new Location("Buenos Aires", -34.6037, -58.3816, 225.3122),
        new Location("Vauxhall, London", 51.4862, -0.1217, 351.3264)
      ]
    }
  }

  async updateCoords() {
    for (let i = 0; i < this.state.locations.length; i++) {
      fetchCoords(this.state.locations[i].name).then(location => {
        this.setState((curr, props) => ({
          locations: curr.locations.map((item, j) => i === j ? new Location(this.state.locations[i].name, location.lat, location.lng, calculateBearing(this.state.locations[0], location)) : item)
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
