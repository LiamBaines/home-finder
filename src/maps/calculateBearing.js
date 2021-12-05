function calculateBearing(lat1, lng1, lat2, lng2) {

  console.log(lat1, lat2, lng1, lng2);

  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const λ1 = lng1 * Math.PI/180;
  const λ2 = lng2 * Math.PI/180;

  const y = Math.sin(λ2-λ1) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2)* Math.cos(λ2-λ1);
  const θ = Math.atan2(y, x);

  let bearing =  (θ * 180 / Math.PI + 360) % 360

  console.log(bearing)

  return bearing;
}

export default calculateBearing;