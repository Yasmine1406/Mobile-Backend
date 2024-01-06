// controllers/productController.js
const { Produit } = require('../models/produit');
const uuid = require('uuid');


// Add a new product
async function addProduit (req, res,db) {

  const { nomProduit, quantité, dateDePéremption, prix, idVendeur, idCategorie } = req.body;


  // Generate a random idProduit using uuid
  const idProduit = uuid.v4();
  // Insert the  produit into the database
  const sql = 'INSERT INTO produit (idProduit, nomProduit, quantité, dateDePéremption, prix, idVendeur, idCategorie) VALUES (?, ?, ?, ?, ?, ?,?)';
  const values = [idProduit, nomProduit, quantité, dateDePéremption, prix, idVendeur, idCategorie];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Product added successfully',idProduit: result.insertId});
  });
};



// Delete a product
async function deleteProduit (req, res, db) {
  const { idProduit } = req.body;
  const sql = 'DELETE FROM produit WHERE idProduit = ?';

  db.query(sql, idProduit, (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Product deleted successfully'});
  });
};

// controllers/produitController.js
const { DataTypes } = require('sequelize');

// Update a product
async function updateProduit (req, res, db) {
  const { idProduit, nomProduit, quantité, dateDePéremption, prix, idCategorie } = req.body;
  const values = [idProduit, nomProduit, quantité, dateDePéremption, prix, idCategorie];
  const sql = 'UPDATE produit SET nomProduit = ?, quantité = ?, dateDePéremption = ?, prix = ?, idCategorie = ? WHERE idProduit = ?';

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Product updated successfully'});
  });
};

module.exports = addProduit;
module.exports = deleteProduit;
module.exports = updateProduit;


