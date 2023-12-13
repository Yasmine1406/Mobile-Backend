// routes/categorieRoutes.js
const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

router.get('/', categorieController.getCategories);
router.get('/:idCategorie', categorieController.getCategorieById);

module.exports = router;
