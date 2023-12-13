// models/vendeur.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index'); 

const Vendeur = sequelize.define('Vendeur', {
  idVendeur: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull : false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
});

module.exports = Vendeur;
