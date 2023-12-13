// commandeRoutes.js
const express = require('express');
const router = express.Router();

// Define routes related to orders (common for both client and vendeur)
router.get('/', (req, res) => {
  // Handle order route logic
  res.send('Order route');
});

// Export the router
module.exports = router;
