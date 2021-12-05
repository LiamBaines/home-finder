import $ from 'jquery';

async function fetchCoords(str) {
    let url = "https://maps.googleapis.com/maps/api/geocode"
    + "/json"
    + "?key=AIzaSyDdp-2TIAzcjhzB55M9fC1ViACU5dojZZw"
    + "&address=" + str;
    const promise = $.get(url).then(response => response.results[0].geometry.location);
    return await promise;
  }

export default fetchCoords;