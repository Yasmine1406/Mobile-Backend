// controllers/commandeController.js
const { Commande, Produit } = require('../models/commande');

// Add a produit to the commande
async function addProduitToCommande (req, res, db) {
  const { idClient, idProduit, quantité } = req.body;

  // Generate a random idCommande using uuid
  const idCommande = uuid.v4();
  // Set statut as False by default
  const statut = 'False';
  // Insert the  produit into the commande
  const sql = 'INSERT INTO commande (idCommande, idproduit, idClient, quantité, statut) VALUES (?, ?, ?, ?, ?)';
  const values = [idClient, idProduit, quantité];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Product added successfully',idProduit: result.insertId});
  });
};


// Delete a product from the commande
exports.deleteProduitFromCommande = async (req, res) => {
  const { idProduit } = req.params;
  const { client } = req; // Access the authenticated client from the request

  try {
    // Check if the product with the provided productId exists
    const produit = await Produit.findByPk(idproduit);

    if (!produit) {
      return res.status(404).json({ error: 'Produit not found' });
    }

    // Check if the produit is associated with the client in a commande
    const commande = await Commande.findOne({
      where: {
        idProduit,
        idClient: client.id,
      },
    });

    if (!commande) {
      return res.status(403).json({ error: 'Unauthorized: Produit not in client\'s commande' });
    }

    // Delete the produit from the commande
    await commande.destroy();

    res.json({ message: 'Produit deleted from commande successfully' });
  } catch (error) {
    console.error('Error deleting produit from commande:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update the quantité of a produit in the commande
exports.updateProduitQuantité = async (req, res) => {
  const { idProduit } = req.params;
  const { quantité } = req.body;
  const { client } = req; // Access the authenticated client from the request

  try {
    // Check if the produit with the provided produitId exists
    const produit = await Produit.findByPk(idProduit);

    if (!produit) {
      return res.status(404).json({ error: 'Produit not found' });
    }

    // Check if the produit is associated with the client in a commande
    const commande = await Commande.findOne({
      where: {
        idProduit,
        idClient: client.id,
      },
    });

    if (!commande) {
      return res.status(403).json({ error: 'Unauthorized: Produit not in client\'s commande' });
    }

    // Update the quantité of the produit in the commande
    await commande.update({ quantité });

    res.json({ message: 'Produit quantité updated in commande successfully' });
  } catch (error) {
    console.error('Error updating produit quantité in commande:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.validateCommande = async (req, res) => {
  const { client } = req; // Access the authenticated client from the request

  try {
    // Check if the client has a commande that is not validated
    const commande = await Commande.findOne({
      where: {
        idClient: client.id,
        statut: false, // Not validated
      },
    });

    if (!commande) {
      return res.status(403).json({ error: 'Unauthorized: No pending commande to validate' });
    }

    // Update the statut to true, indicating the commande is validated
    await commande.update({ statut: true });

    // Update product quantities
    for (const produit of commande.produits) {
      // Ensure the product quantity is subtracted from the stock
      await produit.update({
        stock: produit.stock - produit.CommandeProduit.quantity,
      });
    }

    res.json({ message: 'Commande validated successfully' });
  } catch (error) {
    console.error('Error validating commande:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




