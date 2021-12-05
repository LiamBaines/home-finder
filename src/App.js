import './App.css';
import Location from './location/Location.js';

import Wrap from './wrap/Wrap.js'

import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

import calculateBearing from './maps/calculateBearing.js';
import fetchCoords from './maps/fetchCoords.js';

import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationsLoaded: false,
      locations: [
        new Location("Paris", 48.8566, 2.3522, 0),
        new Location("Berlin", 52.5200, 13.4050, 62.3600),
        new Location("Shanghai", 31.2304, 121.4737, 281.04)
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

  async readLocationsFromQuery(query) {
    console.log('reading locations from query ' + this.state.locationsLoaded)
    if (!this.state.locationsLoaded) {
        let preset = query.get('preset');
        let locations = JSON.parse(atob(preset))
        await this.setInitialLocations(locations)
        setTimeout(() => { this.updateCoords() }, 1000);
    }
  }
  
  async setInitialLocations(names) {
    console.log('setting initial locations')
    console.log(names)
    console.log(this.state)
    this.setState(curr => ({
      locations: names.map(name => new Location(name, 0, 0, 0)),
      locationsLoaded: true
    }))
  }

  render() {
    return (  
      <Router>
        <Wrap
          locations={this.state.locations}
          addLocation={this.addLocation.bind(this)} 
          readLocationsFromQuery={this.readLocationsFromQuery.bind(this)}
          updateCoords={this.updateCoords.bind(this)}
          updateName={this.updateName.bind(this)}
        />
      </Router>
      );
  }

}

export default App;
