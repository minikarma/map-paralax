mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGlucHJvamVjdDEiLCJhIjoiY2ptdW93MXZrMDNjMTNrcGhmNTJ1ZGljdCJ9.9fC5LXUepNAYTKu8O162OA';
var map = new mapboxgl.Map({
    container: 'map',
    zoom: 11,
    center: [-73.986,40.7085],
    bearing: 89,
    style: 'mapbox://styles/martinproject1/cjnfxj6053wz32rq8r9sija4o'
});

//https://api.mapbox.com/styles/v1/martinproject1/cjnfxj6053wz32rq8r9sija4o.html?fresh=true&title=true&access_token=pk.eyJ1IjoibWFydGlucHJvamVjdDEiLCJhIjoiY2ptdW93MXZrMDNjMTNrcGhmNTJ1ZGljdCJ9.9fC5LXUepNAYTKu8O162OA#9.6/40.7475/-73.8923/-11

var minPitch = 0, maxPitch = 60, maxBase = 1000;

var text = document.getElementById('text'),
    lineLength = 0,
    lineJson = { type: "FeatureCollection", features: [] };

handleScroll = () => {
  var position = text.scrollTop/text.scrollHeight;
  console.log(position);
  map.setPitch(maxPitch*position);
  map.setPaintProperty("trips", "fill-extrusion-height", ["*", ["get", "trips"],10*position]);

}

//https://api.mapbox.com/styles/v1/lenaemaya/cjlfpuhuj3z482sl8qqfuzsxk.html?fresh=true&title=true&access_token=pk.eyJ1IjoibGVuYWVtYXlhIiwiYSI6ImNpa3VhbXE5ZjAwMXB3eG00ajVyc2J6ZTIifQ.kmZ4yVcNrupl4H8EonM3aQ#11.06/40.7085/-73.986/89.8/19


text.onscroll = handleScroll;

map.on('click', ()=>{
  console.log(map.getCenter());
  console.log(map.getBearing());
  console.log(map.getPitch());
});

map.on('load', ()=>{
  map.addSource("trips", {type: "geojson", data: './data/trips_extrude.geojson' });
  //handleScroll();
  map.addLayer({
    "id": "trips",
    "type": "fill-extrusion",
    "source": "trips",
    "filter": [">", "trips", 0],
    "paint": {
      "fill-extrusion-opacity": 0.7,
      "fill-extrusion-height": ["*", ["get", "trips"],0],
  //    "fill-extrusion-base": maxBase,
      "fill-extrusion-color": [
        "interpolate",
        ["exponential", 1.3],
        ["get", "trips"],
        0,
        "#f2a8ff",
        200,
        "#dc70ff",
        400,
        "#bc39fe",
        500,
        "#9202fd",
        600,
        "#6002c5"
      ]
    }
  })
});
