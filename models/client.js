// models/client.js
const { DataTypes } = require('sequelize');
const db = require('../index');
const util = require('util');


const Client = {
    findByIdClientInCommande: async (idClient, db) => {
      const query = 'SELECT * FROM commande WHERE idClient = ?';
      const queryAsync = util.promisify(db.query).bind(db);
  
      try {
        const results = await queryAsync(query, [idClient]);
  
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

  module.exports = Client;