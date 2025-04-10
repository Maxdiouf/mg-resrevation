const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Récupérer tous les vols
router.get('/', async (req, res) => {
  try {
    const flights = await prisma.flight.findMany();
    res.json(flights);
  } catch (error) {
    console.error('Erreur lors de la récupération des vols:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer un vol par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const flight = await prisma.flight.findUnique({
      where: { id }
    });
    
    if (!flight) {
      return res.status(404).json({ error: 'Vol non trouvé' });
    }
    
    res.json(flight);
  } catch (error) {
    console.error('Erreur lors de la récupération du vol:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
