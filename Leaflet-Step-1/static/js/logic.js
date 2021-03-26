var usgs_url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
//Associates the data link
d3.json(usgs_url, function(data) {
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
    console.log("Before CF");
    createFeatures(data.features);
    console.log("After Create Features");
  });

function createFeatures(earthquakeData) {
      //loop through the data
    console.log(earthquakeData)
    EarthQuakeLoc = earthquakeData.map((feature) => 
      L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: getRadius(feature.properties.mag),
        stroke: true,
        color: 'Teal',
        opacity: 1,
        weight: 0.8,
        fill: true,
        fillColor: getColor(feature.properties.mag),
        fillOpacity: 0.5   
    }).bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + "<h3>"+new Date(feature.properties.time)+"</h3>" + "</p><hr><h3>Magnitude: " + feature.properties.mag + "</h3>").addTo(myMap));
    };
  //function createMap(earthQuakes) {
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
      zoom: 5 
    });
    console.log("After myMap & before attaching streetMap");
    streetmap.addTo(myMap);

    var legend = L.control({position: 'bottomright'}); 
    
    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Magnitudes</h4>";
      div.innerHTML += '<i style="background: Lime"></i><span>Less than 1</span><br>';
      div.innerHTML += '<i style="background: GreenYellow"></i><span>1-2</span><br>';
      div.innerHTML += '<i style="background: Gold"></i><span>2-3</span><br>';
      div.innerHTML += '<i style="background: Orange"></i><span>3-4</span><br>';
      div.innerHTML += '<i style="background: OrangeRed"></i><span>4-5</span><br>';
      div.innerHTML += '<i style="background: Red"></i><span>Greater than 5</span><br>';
      return div;
    };

  //   legend.onAdd = function () {
  //     var div = L.DomUtil.create('div', 'legend');
  //     return div;
  //   }; 
 
    legend.addTo(myMap);
    // document.querySelector(".legend").innerHTML=displayLegend();
  //}

  function getRadius(magnitude){
        if (magnitude <= 1){
            return 6
        }
        return magnitude * 6;
      } 
    
  function getColor(mag) {
        var color = "";
        if (mag <= 1) { color = "Lime"; }
        else if (mag <= 2) {color = "GreenYellow"; }
        else if (mag <= 3) { color = "Gold"; }
        else if (mag <= 4) {color = "Orange"; }
        else if (mag <= 4) {color = "OrangeRed"; }
        else { color = "Red"; }
      
     return color;
    }



    // function displayLegend(){
    //   var legendInfo = [{
    //       limit: "0-1",
    //       color: "Lime"
    //   },{
    //       limit: "1-2",
    //       color: "GreenYellow"
    //   },{
    //       limit:"2-3",
    //       color:"Gold"
    //   },{
    //       limit:"3-4",
    //       color:"Orange"
    //   },{
    //       limit:"4-5",
    //       color:"OrangeRed"
    //   },{
    //       limit:"5+",
    //       color:"Red"
    //   }];  
       
    //   Legendheader = ['<strong> Magnitudes </strong><br>'];
    //   labels= "";
    //   for (i = 0; i < legendInfo.length; i++){
    //      labels += "<p style = \"background-color: "+legendInfo[i].color+"\">"+legendInfo[i].limit+"</p> ";
    //     //labels += '<i class="circle" style= "background:' + getColor(categories[i]) + '"></i> '
    //     // '<i class="circle" style= "background:' + getColor(categories[i]) + '"></i> ' +
    //     // (categories[i] ? categories[i] : '+')
    //     }
    //   return Legendheader+labels;
    // } 
    