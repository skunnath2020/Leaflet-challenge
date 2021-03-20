var usgs_url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
//Associates the data link
d3.json(usgs_url, function(data) {
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });

function createFeatures(earthquakeData) {
      //loop through the data
    console.log(earthquakeData)
    EarthQuakeLoc = earthquakeData.map((feature) => 
      L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: getRadius(feature.properties.mag),
        stroke: true,
        color: 'white',
        opacity: 1,
        weight: 0.8,
        fill: true,
        fillColor: getColor(feature.properties.mag),
        fillOpacity: 0.5   
    }).bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><h3>Magnitude: " + feature.properties.mag + "</h3>").addTo(myMap));
  };
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 9,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [39.106667, -94.676392],
    zoom: 13
  });
  streetmap.addTo(myMap);

  function getRadius(magnitude){
        if (magnitude <= 1){
            return 8
        }
        return magnitude * 8;
      } 

  function getColor(mag) {
        var color = "";
        if (mag <= 2) { color = "#cfb53b"; }
        else if (mag <= 3) {color = "#ffa500"; }
        else if (mag <= 4) { color = "#f28500"; }
        else if (mag <= 5) {color = "#ec5800"; }
        else { color = "#ff4500"; }
      
     return color;
    }

    