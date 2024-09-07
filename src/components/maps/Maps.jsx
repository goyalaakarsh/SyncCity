import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import './Maps.css'; // Ensure this file has appropriate styles

// Ensure to replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWFuYXYyMTM5IiwiYSI6ImNtMHJ3aHJ1bTBjazIybHI0ajE1bmI0NnMifQ.y2ScM_hB01_aDQ_7gKY10g'; // Replace with your actual token

const MapComponent = ({ location, projectName }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

    const fetchLocation = async () => {
      try {
        const response = await geocodingClient.forwardGeocode({
          query: location,
          limit: 1
        }).send();
        
        if (response.body && response.body.features.length > 0) {
          const [lng, lat] = response.body.features[0].geometry.coordinates;
          setLongitude(lng);
          setLatitude(lat);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    if (location) {
      fetchLocation();
    }
  }, [location]);

  useEffect(() => {
    if (longitude && latitude) {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 12
      });

      map.addControl(new mapboxgl.NavigationControl());

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h5>${projectName}</h5>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Coordinates:</strong> ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>
        `);

      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);

      map.on('mouseenter', 'marker-layer', () => {
        popup.addTo(map);
      });

      map.on('mouseleave', 'marker-layer', () => {
        popup.remove();
      });

      return () => map.remove();
    }
  }, [longitude, latitude, location, projectName]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapComponent;
