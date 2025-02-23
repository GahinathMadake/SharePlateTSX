import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donor: React.FC = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const findRecyclingPartners = async (latitude: number, longitude: number) => {
    const radius = 50000; // 50 km
    const type = 'recycling';
    const url = 'http://localhost:5000/api/nearby-places'; // Backend proxy endpoint

    try {
      const response = await axios.get(url, {
        params: {
          lat: latitude,
          lng: longitude,
          radius: radius,
          type: type,
        },
      });
      return response.data.results;
    } catch (err) {
      console.error('Error fetching recycling partners:', err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      setError(null);

      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            console.log('User Location:', userLocation);

            const partners = await findRecyclingPartners(userLocation.lat, userLocation.lng);
            console.log('Recycling Partners:', partners);
            setPartners(partners);
          },
          (err) => {
            console.error('Error getting user location:', err);
            setError('Unable to fetch your location. Please enable location services.');
          }
        );
      } catch (err) {
        console.error('Error fetching recycling partners:', err);
        setError('Failed to fetch recycling partners. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nearby Recycling Partners</h1>

      {loading && <p className="text-gray-600">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && partners.length === 0 && (
        <p className="text-gray-600">No recycling partners found nearby.</p>
      )}

      {!loading && !error && partners.length > 0 && (
        <div className="space-y-4">
          {partners.map((partner: any) => (
            <div key={partner.place_id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{partner.name}</h2>
              <p className="text-gray-600">{partner.vicinity}</p>
              {partner.rating && (
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-2 text-gray-700">{partner.rating} / 5</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Donor;