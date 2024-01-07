// produitRoutes.js
const express = require('express');
const router = express.Router();
const {addProduit,getProduitStock, deleteProduit, updateProduit, getAllProduits }= require('../controllers/produitController');

// Define routes related to produits (common for both client and vendeur)
router.get('/', (req, res) => {
  // Handle produit route logic
  res.send('Produit route');
});

//Add produit
router.post('/add', (req,res) => addProduit(req, res,req.app.get('db')));



// // Route to delete a product
router.delete('/delete',(req,res) => deleteProduit(req, res, req.app.get('db')));

// Update a product
 router.put('/update',(req,res) => updateProduit(req, res, req.app.get('db')));

// GetAllProducts
router.get('/getAll',(req,res) => getAllProduits(req, res, req.app.get('db')));

// GetProductStock
router.get('/getProductStock',(req,res) => getProduitStock(req, res, req.app.get('db')));

// Export the router
module.exports = router;
