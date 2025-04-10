"use client";
import { useState, useEffect } from 'react';
import { hotelsAPI } from '@/lib/api';

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await hotelsAPI.getAll();
        setHotels(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des hôtels');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement des hôtels...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Hôtels disponibles</h1>
      
      {hotels.length === 0 ? (
        <p>Aucun hôtel disponible pour le moment</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.location}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">{hotel.price}€ / nuit</span>
                  <span className="text-yellow-500">★ {hotel.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
