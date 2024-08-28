import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import './Maps.css'; // Ensure this file has appropriate styles

// Ensure to replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWFuYXYyMTM5IiwiYSI6ImNtMDZzNzRvczB1ZzYyanIwYXhuOTV1YTgifQ.C8n51wmwsawqdCfcV67nHQ'; // Replace with your actual token

const App = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    // Initialize Mapbox geocoding client
    const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

    // Function to fetch location data
    const fetchLocation = async () => {
      try {
        const response = await geocodingClient.forwardGeocode({
          query: 'New Delhi, India',
          limit: 1
        }).send();
        
        if (response.body && response.body.features.length > 0) {
          const [lng, lat] = response.body.features[0].geometry.coordinates;
          setLongitude(lng);
          setLatitude(lat);
          
          console.log(response.body);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

      // Initialize the map
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude], // Starting position [lng, lat]
        zoom: 12
      });

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl());

      // Create and add a popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h5>Project Name</h5>
          <p><strong>Location:</strong> New Delhi, India</p>
          <p><strong>Coordinates:</strong> ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>
        `);

      // Create and add a marker
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);

      // Add event listeners for hover effect
      map.on('mouseenter', 'marker-layer', () => {
        popup.addTo(map);
      });

      map.on('mouseleave', 'marker-layer', () => {
        popup.remove();
      });

      return () => map.remove();
    }
  }, [longitude, latitude]);

  return (
    <div>
      <div id="map" ></div>
    </div>
  );
};

export default App;
