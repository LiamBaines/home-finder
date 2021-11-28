import LocationInput from '../location/LocationInput.js';

import React from 'react';

function Wrap(props) {
  let locations = props.locations.map((location, i) => new LocationInput(location, props.updateName, i));
  return (   
    <div>
      <header>
        <div id="wrap" className="container main">
          <div className="form-inline">
            {locations}
          </div>
          <div>
          <button onClick={props.addLocation}>Add location</button>
            <button onClick={props.updateCoords}>Update coordinates</button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Wrap;