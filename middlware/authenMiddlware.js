// middleware/authMiddleware.js
const Vendeur = require('../models/vendeur');

exports.authenticateVendeur = async (req, res, next) => {
  const { idVendeur } = req.body;

  try {
    const vendeur = await Vendeur.findById(idVendeur);

    if (!vendeur) {
      return res.status(401).json({ error: 'Unauthorized: vendeur not found' });
    }

    req.vendeur = vendeur;
    next();
  } catch (error) {
    console.error('Error authenticating vendeur:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// middleware/authMiddleware.js
const { Client } = require('../models/client');

// Middleware to check if the request is coming from an authenticated client
exports.authenticateClient = async (req, res, next) => {
  const { idClient } = req.body;

  try {
    // Check if the client with the provided idClient exists in the database
    const client = await Client.findByPk(idClient);

    if (!client) {
      return res.status(401).json({ error: 'Unauthorized: Client not found' });
    }

    // Attach the client object to the request for further use
    req.client = client;
    next();
  } catch (error) {
    console.error('Error authenticating client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




