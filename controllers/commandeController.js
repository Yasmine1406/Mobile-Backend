// controllers/commandeController.js
const Client = require('../models/client');
const uuid = require('uuid');
const Produit = require('../models/produit');
const Commande = require('../models/commande');


//AddProduitToCommande
async function addProduitToCommande(req, res, db) {
  const { idProduit, idClient, quantité } = req.body;
  console.log(idClient);
  const statut = 'False';
  const idCommandeinit = uuid.v4();

  try {

    // Check if the client with the provided clientId exists
    console.log(idClient);
    const commande = await Commande.findIdCommandeByIdClient(idClient, db);
    console.log(commande);
    if (!commande) {
      // Add produit to the new commande
      const sqlAddInit = 'INSERT INTO commande (idCommande, idProduit, idClient, statut, quantité) VALUES (?, ?, ?, ?, ?)';
      const valuesAddInit = [idCommandeinit, idProduit, idClient, statut, 1];

      db.query(sqlAddInit, valuesAddInit, (err, result) => {
        if (err) {
          console.error('Error adding produit to commande:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        else{
          console.log(result)
          res.json({ message: 'Product added to commande successfully' });
      }
      });
    } else {
      console.log(idClient);
      // Check if the product with the provided productId exists
      const produit = await Produit.findByIdProduitInCommande(idProduit, idClient, db);
      console.log(produit);

      if (!produit) {
        // Add the produit to the commande
        const idCommande = await Commande.findIdCommandeByIdClient(idClient, db);
        const sqlAddInit = 'INSERT INTO commande (idCommande, idProduit, idClient, statut, quantité) VALUES (?, ?, ?, ?, ?)';
        const valuesAddInit = [idCommande, idProduit, idClient, statut, 1];

        db.query(sqlAddInit, valuesAddInit, (err, result) => {
          if (err) {
            console.error('Error updating produit quantity:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.json({ message: 'Product quantity updated successfully' });
        });
      } else {
        console.log('product found');
        // Calculate new quantity
        const newQuantité = produit.quantité + quantité;
        console.log(newQuantité);
        const idCommande = await Commande.findIdCommandeByIdClient(idClient, db);
        const sqlUpdate = 'UPDATE commande SET quantité = ? WHERE idCommande = ? AND idProduit = ? AND idClient = ?';

        db.query(sqlUpdate, [newQuantité, idCommande, idProduit, idClient], (err, result) => {
          if (err) {
            console.error('Error updating produit quantity:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          else{
          res.json({ message: 'Product quantity updated successfully' });}
        });
      }
    }
  } catch (error) {
    console.error('Error adding/updating produit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a product from the commande
async function deleteProduitFromCommande(req, res, db) {
  const { idProduit } = req.body;
  const sqlDelete = 'DELETE FROM commande WHERE idProduit = ?';
  const sqlUpdate = 'UPDATE commande SET quantité = ? WHERE idProduit = ?';

  try {
    // Check if the product with the provided productId exists
    const produit = await Produit.findByIdProduit(idProduit, db);

    if (!produit) {
      return res.status(404).json({ error: 'Produit not found' });
    }

    // Calculate new quantity
    const quantité = produit.quantité - 1;

    if (quantité === 0) {
      // Delete the produit from the commande
      db.query(sqlDelete, [idProduit], (err, result) => {
        if (err) {
          console.error('Error deleting produit:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Product deleted successfully' });
      });
    } else {
      // Update the quantity in the commande
      db.query(sqlUpdate, [quantité, idProduit], (err, result) => {
        if (err) {
          console.error('Error updating produit quantity:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Product quantity updated successfully' });
      });
    }
  } catch (error) {
    console.error('Error deleting/updating produit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  //Get Produits from commande
  async function getAllProduitsFromCommande(req, res, db) {
    const sql = 'SELECT * FROM commande WHERE idClient = ?';
    const {idClient} = req.query;
  
    db.query(sql, [idClient],(err, result) => {
      if (err) {
        console.error('Error fetching produits:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log(result);
  
      res.json({ message: 'Produits fetched successfully', data: result });
    });
  }


//ValidateCommande
async function validateCommande (req, res, db) {
  
  const  {idClient}  = req.body;
  console.log(idClient);
  const quantitéStock = Produit.findQuantitéByIdProduit;
  const sql = 'UPDATE commande SET statut = ? WHERE idClient = ?';
  const statut = true;
  const values = [statut, idClient];

  try{
    db.query(sql, values, (err, result) => {
      console.log(result);
      if (err) {
        console.error('Error updating commande', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'Commande validated successfully' });
    })
  }
  catch (error) {
    console.error('Error validating commande:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addProduitToCommande,
  deleteProduitFromCommande,
  validateCommande,
  getAllProduitsFromCommande,
};

