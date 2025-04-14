const { PrismaClient } = require("@prisma/client");
//import { PrismaClient } from "app/generated/prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur de test
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: await bcrypt.hash("password123", 10),
    },
  });

  // Créer des hôtels de test
  const hotels = [
    {
      name: "Grand Hôtel Paris",
      description: "Un hôtel luxueux situé au cœur de Paris",
      location: "Paris, France",
      price: 250.0,
      rating: 4.8,
      amenities: ["WiFi", "Piscine", "Spa", "Restaurant"],
      images: ["hotel1.jpg", "hotel1-room.jpg"],
    },
    {
      name: "Beach Resort",
      description: "Magnifique resort en bord de plage",
      location: "Nice, France",
      price: 180.0,
      rating: 4.5,
      amenities: ["WiFi", "Plage privée", "Bar"],
      images: ["hotel2.jpg", "hotel2-beach.jpg"],
    },
    // Ajoutez d'autres hôtels...
  ];

  for (const hotel of hotels) {
    await prisma.hotel.create({
      data: hotel,
    });
  }

  // Créer des vols de test
  const flights = [
    {
      airline: "Air France",
      flightNumber: "AF123",
      departureCity: "Paris",
      arrivalCity: "New York",
      departureTime: new Date("2023-12-15T08:00:00Z"),
      arrivalTime: new Date("2023-12-15T20:00:00Z"),
      price: 450.0,
      seats: 180,
    },
    {
      airline: "British Airways",
      flightNumber: "BA456",
      departureCity: "London",
      arrivalCity: "Tokyo",
      departureTime: new Date("2023-12-16T12:00:00Z"),
      arrivalTime: new Date("2023-12-17T10:00:00Z"),
      price: 850.0,
      seats: 220,
    },
    // Ajoutez d'autres vols...
  ];

  for (const flight of flights) {
    await prisma.flight.create({
      data: flight,
    });
  }

  console.log("Base de données initialisée avec succès");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
