// commandeRoutes.js
const express = require('express');
const router = express.Router();

// Define routes related to commande (common for both client and vendeur)
router.get('/', (req, res) => {
  // Handle order route logic
  res.send('Order route');
});



const commandeController = require('../controllers/commandeController');
const { addProduitToCommande, deleteProduitFromCommande, validateCommande, } = require('../controllers/commandeController');


// Add a produit to the commande
router.post('/addToCommande', (req,res) => addProduitToCommande(req, res,req.app.get('db')));

// Deelete a produit from the commande
router.delete('/deleteFromCommande', (req,res) => deleteProduitFromCommande(req, res,req.app.get('db')));


// Validate the commande
router.put('/validate', (req,res) => validateCommande(req, res,req.app.get('db')));

// Export the router
module.exports = router;


