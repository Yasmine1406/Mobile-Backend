// controllers/productController.js
const { Produit } = require('../models/produit');
const uuid = require('uuid');

// Add a new product
exports.addProduit = async (req, res) => {

  const { nomProduit, quantité, dateDePéremption, prix, idCategorie } = req.body;
  const { vendeur } = req; // Access the authenticated vendeur from the request

  // Generate a random idClient using uuid
  const idProduit = uuid.v4();

  try {
    // Create a new produit associated with the authenticated vendeur
    const newProduit = await Produit.create({
      idProduit,
      nomProduit,
      quantité,
      dateDePéremption,
      prix,
      idCategorie,
      idVendeur: seller.id, // Associate the produit with the vendeur
    });

    res.json({ message: 'Produit added successfully', productId: newProduit.id });
  } catch (error) {
    console.error('Error adding produit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
