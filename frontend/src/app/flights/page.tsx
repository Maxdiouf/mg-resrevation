"use client";
import { useState, useEffect } from 'react';
import { flightsAPI } from '@/lib/api';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await flightsAPI.getAll();
        setFlights(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des vols');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement des vols...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Vols disponibles</h1>
      
      {flights.length === 0 ? (
        <p>Aucun vol disponible pour le moment</p>
      ) : (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div key={flight.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{flight.airline} - {flight.flightNumber}</h2>
                  <p className="text-gray-600">{flight.departureCity} → {flight.arrivalCity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{flight.price}€</p>
                  <p className="text-sm text-gray-500">{flight.seats} sièges disponibles</p>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>Départ: {new Date(flight.departureTime).toLocaleString()}</span>
                <span>Arrivée: {new Date(flight.arrivalTime).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
