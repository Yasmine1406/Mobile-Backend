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


// Route to delete a product
router.delete('/delete/:idProduit', authMiddleware.authenticateVendeur, produitController.deleteProduit);

// Update a product
router.put('/update/:productId', authMiddleware.authenticateVendeur, produitController.updateProduit);

// Export the router
module.exports = router;
