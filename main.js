var {DeckGL, GeoJsonLayer, HexagonLayer, _GlobeView, SimpleMeshLayer, H3ClusterLayer} = deck;
var COUNTRIES = 'involve.geojson'
const EARTH_RADIUS_METERS = 6.3e6;

const getColor = (value) => {
    if (value == "Страна-пересадочный узел") {
        return [202, 0, 32];
      } else if (value == "Страна с преобладанием международных рейсов"){
        return [244, 165, 130];
      } else if (value == "Страна с преобладанием региональных перевозок и развитыми международными перевозками"){
        return [223, 83, 81];
      } else if (value == "Страна с преобладанием внутренних перевозок и развитыми международными перевозками"){
        return [250, 210, 193];
      } else if (value == "Страна с преобладанием внутренних рейсов и развитыми региональными перевозками"){
        return [255, 255, 255];
      } else if (value == "Страна с развитыми региональными перевозками"){
        return [221, 221, 221];
      } else if (value == "Страна с преобладанием внутренних рейсов"){
        return [186, 186, 186];
      } else if (value == "Страна-изолят") {
        return [125, 125, 125];
      } else {
        return [64, 64, 64]; 
      }
  };
    
let globe = new deck.SimpleMeshLayer({
    id: 'earth-sphere',
    data: [0],
    mesh: new luma.SphereGeometry({radius: EARTH_RADIUS_METERS, nlat: 18, nlong: 36}),
    coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
    getPosition: [0, 0, 0],
    getColor: [0, 49, 89]
  });

let countries = new deck.GeoJsonLayer({
    id: 'earth-land-layer2',
    data: COUNTRIES,
    stroked: false,
    filled: true,
    getFillColor: d => getColor(d.properties.cat),
    opacity: 1,
    stroked: true,
    getLineColor: [21, 21, 21],    
    getLineWidth: 0.2,
    lineWidthUnits: 'common',
    pickable: true, 
    autoHighlight: true,
    highlightColor: [61, 61, 61],
    onHover: info => {
      if (info.object) {
        const countryInfo = info.object.properties.NAME + " - " + info.object.properties.cat;
        console.log(`cat: ${countryInfo}`);
        document.getElementById('cat').innerText = 
          countryInfo; 
      } else {
        document.getElementById('cat').innerText = '';
      }
    }
  });

let mydeckgl = new DeckGL({
  views: new _GlobeView(),
  initialViewState: {
    longitude: 55,
    latitude: 37,
    zoom: 2,
  },
  mapStyle: {
    version: 8,
    sources: {},
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': '#111' }
      }
    ]
  },
  controller: true, 
  layers: [globe, countries],
});
