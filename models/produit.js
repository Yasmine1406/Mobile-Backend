// models/product.js
const { DataTypes } = require('sequelize');
const db = require('../index');
const util = require('util');

module.exports = (sequelize) => {
  const Produit = sequelize.define('Produit', {
    idProduit: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idCategorie:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    idVendeur:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nomProduit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantité: {
      type: DataTypes.INT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Example: up to 10 digits, 2 decimal places
      allowNull: false,
    },
    dateDePéremption: {
        type: DataTypes.DATE
    }
    // Add any other fields relevant to your product
  });

  return Produit;
};

const Produit = {
  findByIdProduit: async (idProduit, db) => {
    const query = 'SELECT * FROM produit WHERE idProduit = ?';
    const queryAsync = util.promisify(db.query).bind(db);

    try {
      const results = await queryAsync(query, [idProduit]);

      if (results.length === 0) {
        return null;
      } else {
        return results[0];
      }
    } catch (error) {
      throw error;
    }
  },
  findByIdProduitInCommande: async (idProduit,idClient, db) => {
    const query = 'SELECT * FROM commande WHERE idProduit = ? AND idClient = ?';
    const queryAsync = util.promisify(db.query).bind(db);

    try {
      const results = await queryAsync(query, [idProduit, idClient]);

      if (results.length === 0) {
        return null;
      } else {
        return results[0];
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Produit;
