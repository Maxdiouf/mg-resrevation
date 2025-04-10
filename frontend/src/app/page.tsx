"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Réservez votre prochain voyage
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Vols</h2>
            <p className="text-gray-600 mb-4">Trouvez les meilleurs tarifs pour votre destination</p>
            <Link 
              href="/flights" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
            >
              Rechercher des vols
            </Link>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Hôtels</h2>
            <p className="text-gray-600 mb-4">Découvrez des hébergements adaptés à vos besoins</p>
            <Link 
              href="/hotels" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
            >
              Rechercher des hôtels
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <p className="mb-4">Déjà plus de 10 000 clients satisfaits</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
            Voir les offres spéciales
          </button>
        </div>
      </div>
    </main>
  );
}
