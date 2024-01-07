// commandeRoutes.js
const express = require('express');
const router = express.Router();

// Define routes related to commande (common for both client and vendeur)
router.get('/', (req, res) => {
  // Handle order route logic
  res.send('Order route');
});



const commandeController = require('../controllers/commandeController');
const authMiddleware = require('../middlware/authenMiddlware');

// // Add a produit to the commande
// router.post('/add', authMiddleware.authenticateClient, commandeController.addProduitToCommande);

// // Deelete a produit from the commande
// router.delete('/delete/:idProduit', authMiddleware.authenticateClient, commandeController.deleteProduitFromCommande);

// // Update the quantité of a produit in the commande
// router.put('/update/:idProduit', authMiddleware.authenticateClient, commandeController.updateProduitQuantité);

// // Validate the commande
// router.put('/validate', authMiddleware.authenticateClient, commandeController.validateCommande);

// // Export the router
// module.exports = router;


