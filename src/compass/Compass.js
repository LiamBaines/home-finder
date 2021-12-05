import Arrow from './Arrow.js';
import centre from '../media/centre.png';
import compass from '../media/compass.png';

function Compass(locations) {

  let compassRadius = 200

  return (
    <div className="compass-container">
      <img className="compass-background" src={compass} alt="" height={compassRadius  * 2}></img>
      {locations.map((location, i) => (i === 0) ? null : new Arrow(location.name, compassRadius, location.bearing))}
      <img className="compass-item" src={centre} alt="" height="40px" style={{"top": compassRadius - 20,"left": compassRadius -20}}></img>
    </div>
  )

}

export default Compass;