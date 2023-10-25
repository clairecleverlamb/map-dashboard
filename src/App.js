import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './App.css'
import {states} from './states.js'

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

let geoJsonForm = {'type': 'FeatureCollection','features':[]};

states.forEach(element => {
  let tempData = {
    'type':'Feature',
    'properties': {
      'name': element['name']
    },
    'geometry': {
      'type': 'Polygon',
      'coordinates': element['geometry']
    }
  }
  geoJsonForm['features'].push(tempData)
});
console.log(geoJsonForm)

map.current.on('load', () => {
  // Add a data source containing GeoJSON data.
  map.current.addSource('maine', {'type': 'geojson','data':geoJsonForm});

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
