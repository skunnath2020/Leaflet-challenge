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
    EarthQuakeLoc = earthquakeData.map((feature) => 
      L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: getRadius(feature.properties.mag),
        stroke: true,
        color: 'black',
        opacity: 1,
        weight: 0.8,
        fill: true,
        fillColor: getColor(feature.properties.mag),
        fillOpacity: 0.9   
    }).bindPopup("<h1> Magnitude : " + feature.properties.mag + "</h1> <hr> <h3>" +
                    feature.properties.place +
                    "</h3)<hr><p>" + new Date(feature.properties.time) + "</p>")
 
    )
  };
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
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

  function getRadius(mag){
        if (mag <= 1){
            return 8
        }
        return mag * 8;
      } 

  function getColor(mag) {
        var color = "";
        if (mag <= 2) { color = "#ffffb2"; }
        else if (mag <= 3) {color = "#fecc5c"; }
        else if (mag <= 4) { color = "#fd8d3c"; }
        else if (mag <= 5) {color = "#f03b20"; }
        else { color = "#bd0026"; }
      
     return color;
    }

    