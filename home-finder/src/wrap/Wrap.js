import LocationInput from '../location/LocationInput.js';

import React from 'react';

import Compass from '../compass/Compass.js';

function Wrap(props) {
  let locations = props.locations.map((location, i) => new LocationInput(location, i, props.updateName));
  return (   
    <div>
      <header>
        <div id="wrap" className="container main">
          <div class="row">
            <div class="col">
              {new Compass(props.locations)}
            </div>
            <div class="col">
              <div className="form-inline">
                  {locations}
                </div>
                <div>
                  <button onClick={props.addLocation}>Add location</button>
                  <button onClick={props.updateCoords}>Update coordinates</button>
                </div>
              </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Wrap;