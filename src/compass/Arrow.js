import arrow from '../media/arrow.png';

function Arrow(name, compassRadius, bearing) {

  let arrowOrigHeight = 1038
  let arrowOrigWidth = 125
  let arrowScaleFactor = (compassRadius) / arrowOrigHeight;
  let arrowHeight = arrowOrigHeight * arrowScaleFactor;
  let arrowWidth = arrowOrigWidth * arrowScaleFactor;
  let overlap = arrowWidth / 2;
  let arrowTopGap = (compassRadius - arrowHeight) + overlap
  let arrowLeftGap = compassRadius - overlap;

  let arrowStyle = {
    "top": arrowTopGap,
    "left": arrowLeftGap,
    "transform-origin": (arrowWidth / 2) + "px " + (arrowHeight - overlap) + "px",
    "transform": "rotate(" + bearing + "deg)"
  }

  let textStyle = {
    "top": compassRadius - overlap,
    "left": compassRadius,
    "transform-origin": "0% 50%",
    "transform": "rotate(" + (bearing - 90) + "deg) translate(" + (compassRadius + 5) + "px, 0px)"
  }

  return (
      <div>
        <img className="compass-item" src={arrow} alt="" height={arrowHeight} style={arrowStyle}></img>
        <span className="compass-item" style={textStyle}>{name}</span>
      </div>
  )

}

export default Arrow;