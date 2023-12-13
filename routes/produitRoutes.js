// produitRoutes.js
const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');
const authMiddleware = require('../middlware/authenMiddlware');

// Define routes related to produits (common for both client and vendeur)
router.get('/', (req, res) => {
  // Handle produit route logic
  res.send('Produit route');
});

router.post('/add', authMiddleware.authenticateVendeur, produitController.addProduit);

// Export the router
module.exports = router;