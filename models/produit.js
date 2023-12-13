// models/product.js
const { DataTypes } = require('sequelize');

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
