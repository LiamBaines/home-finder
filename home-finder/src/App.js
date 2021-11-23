import './App.css';

import Wrap from './wrap/Wrap.js'

function rad(x) {
  return x * Math.PI / 180;
}

function deg(x) {
  return x * 180 / Math.PI;
}

function sin(x) {
  return Math.sin(rad(x))
}

function cos(x) {
  return Math.cos(rad(x))
}

function atan2(x, y) {
  return Math.atan2(rad(x), rad(y))
}

function delta(x, y) {
  return x - y
}

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

function App() {  

    console.log("beta(Kansas City, St Louis) = " + beta(39.099912, -94.581213, 38.627089, -90.200203))
    console.log("beta(Madrid, New York) = " + beta(40.4168, -3.7038, 40.7128, -74.0060))
    console.log("beta(London, Cape Town) = " + beta( 51.500153, -0.126236, -33.923775, 18.423346))
    console.log("beta(Brixton, Madrid) = " + beta( 51.4572844, -0.1180884,  40.416691,  -3.700345 ))
    

    return (
      <Wrap/>
    );

}

export default App;
