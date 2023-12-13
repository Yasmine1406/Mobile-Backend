const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Register a new client
router.post('/register', (req, res) => clientController.registerClient(req, res, req.app.get('db')));

// Client login
router.post('/login', (req, res) => clientController.loginClient(req, res, req.app.get('db')));


// Export the router
module.exports = router;




