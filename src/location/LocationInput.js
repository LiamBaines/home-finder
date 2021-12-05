import React from 'react';

function LocationInput(location, i, updateName) {
  return (
    <div className="row g-3 align-items-center">
      <div class="col-2">
        <label className="col-form-label">{(i === 0) ? "Home" : "Location " + i}</label>
      </div>
      <div className="col-4">
        <input onChange={(e) => updateName(i, e.target.value)} value={location.name} className="form-control"/>
      </div>
      <div className="col-1">
        <span className="form-text">
          {(i === 0 ) ? null : location.bearing.toFixed(2) + '°'}
        </span>
      </div>
    </div>
  )
}

export default LocationInput;