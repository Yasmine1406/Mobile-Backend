const express = require('express');
const router = express.Router();
const vendeurController = require('../controllers/vendeurController');

// Register a new vendeur
router.post('/register', (req, res) => vendeurController.registerVendeur(req, res, req.app.get('db')));

// Vendeur login
router.post('/login', (req, res) => vendeurController.loginVendeur(req, res, req.app.get('db')));


// Export the router
module.exports = router;
