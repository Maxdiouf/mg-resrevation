const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Récupérer tous les hôtels
router.get('/', async (req, res) => {
  try {
    const hotels = await prisma.hotel.findMany();
    res.json(hotels);
  } catch (error) {
    console.error('Erreur lors de la récupération des hôtels:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer un hôtel par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const hotel = await prisma.hotel.findUnique({
      where: { id }
    });
    
    if (!hotel) {
      return res.status(404).json({ error: 'Hôtel non trouvé' });
    }
    
    res.json(hotel);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'hôtel:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
