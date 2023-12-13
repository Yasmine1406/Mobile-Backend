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

