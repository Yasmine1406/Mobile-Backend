// routes/categorieRoutes.js
const express = require('express');
const router = express.Router();
const getAllCategories = require('../controllers/categorieController');

// getAllCategories
router.get('/getAllCategories', (req,res) => getAllCategories(req, res,req.app.get('db')));

module.exports = router;
