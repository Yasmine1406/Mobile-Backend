// controllers/commandeController.js
const { Commande, Produit } = require('../models');

// Add a product to the commande
exports.addProductToCommande = async (req, res) => {
  const { productId, quantity } = req.body;
  const { client } = req; // Access the authenticated client from the request

  try {
    // Check if the product with the provided productId exists
    const product = await Produit.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create a new commande entry associating the product with the client
    const newCommande = await Commande.create({
      productId,
      quantity,
      clientId: client.id, // Associate the commande with the client
    });

    res.json({ message: 'Product added to commande successfully', commandeId: newCommande.id });
  } catch (error) {
    console.error('Error adding product to commande:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
