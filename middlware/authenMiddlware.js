// middleware/authMiddleware.js
const { Vendeur } = require('../models/vendeur');

// Middleware to check if the request is coming from an authenticated vendeur
exports.authenticateVendeur = async (req, res, next) => {
  const { idVendeur } = req.body;

  try {
    // Check if the vendeur with the provided idVendeur exists in the database
    const vendeur = await Vendeur.findByPk(idVendeur);

    if (!vendeur) {
      return res.status(401).json({ error: 'Unauthorized: vendeur not found' });
    }

    // Attach the vendeur object to the request for further use
    req.vendeur = vendeur;
    next();
  } catch (error) {
    console.error('Error authenticating vendeur:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
