import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './App.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1YmhhbTc1IiwiYSI6ImNrYjhyYTN0YTA2emkyc3AwdG94c2ZjcmsifQ.Whu-ZPpnHEVZLr6NIZVFGQ';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });


map.current.on('load', () => {
  // Add a data source containing GeoJSON data.
  map.current.addSource('maine', {
      'type': 'geojson',
      'data': {
          'type': 'Feature',
          'geometry': {
              'type': 'Polygon',
              // These coordinates outline Maine.
              'coordinates': [
                  [
                      [-67.13734, 45.13745],
                      [-66.96466, 44.8097],
                      [-68.03252, 44.3252],
                      [-69.06, 43.98],
                      [-70.11617, 43.68405],
                      [-70.64573, 43.09008],
                      [-70.75102, 43.08003],
                      [-70.79761, 43.21973],
                      [-70.98176, 43.36789],
                      [-70.94416, 43.46633],
                      [-71.08482, 45.30524],
                      [-70.66002, 45.46022],
                      [-70.30495, 45.91479],
                      [-70.00014, 46.69317],
                      [-69.23708, 47.44777],
                      [-68.90478, 47.18479],
                      [-68.2343, 47.35462],
                      [-67.79035, 47.06624],
                      [-67.79141, 45.70258],
                      [-67.13734, 45.13745]
                  ]
              ]
          }
      }
  });

  // Add a new layer to visualize the polygon.
  map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': 'maine', // reference the data source
      'layout': {},
      'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
      }
  });
  // Add a black outline around the polygon.
  map.addLayer({
      'id': 'outline',
      'type': 'line',
      'source': 'maine',
      'layout': {},
      'paint': {
          'line-color': '#000',
          'line-width': 3
      }
  });
});




  

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
