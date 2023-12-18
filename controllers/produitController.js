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


// Delete a product
exports.deleteProduit = async (req, res) => {
  const { idProduit } = req.params;
  const { vendeur } = req; // Access the authenticated vendeur from the request

  try {
    // Find the product by idProduit and vendeur
    const produit = await Produit.findOne({
      where: {
        idProduit,
        idVendeur: vendeur.idVendeur,
      },
    });

    if (!produit) {
      return res.status(404).json({ error: 'Product not found or unauthorized to delete' });
    }

    // Delete the product
    await produit.destroy();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controllers/produitController.js
const { DataTypes } = require('sequelize');

// Update a product
exports.updateProduit = async (req, res) => {
  const { nomProduit, quantité, dateDePéremption, prix, idCategorie } = req.body;
  const { vendeur } = req; // Access the authenticated vendeur from the request
  const productId = req.params.productId;

  try {
    // Find the product to update
    const existingProduit = await Produit.findByPk(productId);

    if (!existingProduit) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the vendeur is the owner of the product
    if (existingProduit.idVendeur !== vendeur.id) {
      return res.status(403).json({ error: 'Unauthorized: Vendeur is not the owner of the product' });
    }

    // Update the product
    await existingProduit.update({
      nomProduit,
      quantité,
      dateDePéremption,
      prix,
      idCategorie,
    });

    res.json({ message: 'Produit updated successfully' });
  } catch (error) {
    console.error('Error updating produit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


