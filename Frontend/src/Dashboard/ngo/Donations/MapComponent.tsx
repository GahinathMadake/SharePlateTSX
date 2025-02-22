import React, { useEffect, useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from '@react-google-maps/api';

// Move libraries array outside the component to avoid reloading
const libraries = ['places', 'marker']; // Add 'marker' for AdvancedMarkerElement

interface MapComponentProps {
  origin: string; // Pass address as a string
  destination: string; // Pass address as a string
}

function MapComponent({ origin, destination }: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your actual API key
    libraries, // Use the constant libraries array
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null); // Dynamic center

  useEffect(() => {
    if (isLoaded && origin && destination) {
      calculateRoute(origin, destination);
    }
  }, [isLoaded, origin, destination]);

  async function getCoordinates(address: string): Promise<google.maps.LatLngLiteral> {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(new Error('Geocoding failed: ' + status));
        }
      });
    });
  }

  async function calculateRoute(origin: string, destination: string) {
    if (!window.google || !window.google.maps || !window.google.maps.DirectionsService) {
      console.error('Google Maps API is not fully loaded.');
      return;
    }

    try {
      // Convert origin and destination addresses to coordinates
      const originCoords = await getCoordinates(origin);
      const destinationCoords = await getCoordinates(destination);

      // Set the center of the map to the origin coordinates
      setCenter(originCoords);

      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originCoords,
        destination: destinationCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>; // Simple loading message
  }

  return (
    <div className="relative w-full h-[400px]">
      {/* Google Map Container */}
      <GoogleMap
        center={center || { lat: 0, lng: 0 }} // Fallback to {0, 0} if center is not set
        zoom={12}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          mapId: 'YOUR_MAP_ID', // Add your Map ID here
        }}
        onLoad={(map) => setMap(map)}
      >
        {/* Use AdvancedMarkerElement instead of Marker */}
        {directionsResponse && (
          <>
            <DirectionsRenderer directions={directionsResponse} />
            {/* Example of AdvancedMarkerElement */}
            {window.google && window.google.maps && (
              <AdvancedMarkerElement
                position={center || { lat: 0, lng: 0 }} // Fallback to {0, 0} if center is not set
                map={map}
                title="Default Marker"
              />
            )}
          </>
        )}
      </GoogleMap>

      {/* Distance & Duration Display */}
      {distance && duration && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg">
            <strong>Distance:</strong> {distance}
          </p>
          <p className="text-lg">
            <strong>Duration:</strong> {duration}
          </p>
        </div>
      )}
    </div>
  );
}

// AdvancedMarkerElement Component
const AdvancedMarkerElement = ({ position, map, title }: {
  position: google.maps.LatLngLiteral;
  map: google.maps.Map;
  title: string;
}) => {
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.marker) {
      const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
        position,
        map,
        title,
      });
      setMarker(advancedMarker);

      // Cleanup
      return () => {
        if (marker) {
          marker.map = null; // Remove marker from the map
        }
      };
    }
  }, [position, map, title]);

  return null; // AdvancedMarkerElement is managed by Google Maps API
};

export default MapComponent;