// commandeRoutes.js
const express = require('express');
const router = express.Router();

// Define routes related to commande (common for both client and vendeur)
router.get('/', (req, res) => {
  // Handle order route logic
  res.send('Order route');
});



const commandeController = require('../controllers/commandeController');
const authMiddleware = require('../middleware/authMiddleware');

// Add a product to the commande
router.post('/add', authMiddleware.authenticateClient, commandeController.addProductToCommande);



// Export the router
module.exports = router;


