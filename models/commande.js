// models/commande.js
const { DataTypes } = require('sequelize');
// const db = require('../index');
const util = require('util');


const Commande = {
    findByIdCommande: async (idCommande, db) => {
      const query = 'SELECT * FROM commande WHERE idCommande = ?';
      const queryAsync = util.promisify(db.query).bind(db);
  
      try {
        const results = await queryAsync(query, [idCommande]);
  
        if (results.length === 0) {
          return null;
        } else {
          return results[0];
        }
      } catch (error) {
        throw error;
      }
    },
  //   findIdCommandeByIdClient: async (idClient, db) => {
  //       const query = 'SELECT idCommande FROM commande WHERE idClient = ?';
  //       try {
  //           const results = await db.query(query, [idClient]);
  //           console.log(results)
  //           if (results.length === 0) {
  //               return null;
  //           } else {
  //               return results[0].idCommande;
  //           }
  //       } catch (error) {
  //           console.log('error')
  //           throw error;
  //       }
  //   }    
  // };

  // module.exports = Commande;

  // models/commande.js
    findIdCommandeByIdClient: async (idClient, db) => {
      
      const query = 'SELECT idCommande FROM commande WHERE idClient = ?';
      const queryAsync = util.promisify(db.query).bind(db);
      try {
        const results = await queryAsync(query, [idClient]);
        console.log('SQL Query:', query);
        console.log('Query Parameters:', [idClient]);
        console.log('Query Results:', results);

        if (results.length === 0) {
          console.log('No matching idCommande found for idClient:', idClient);
          return null;
        } else {
          console.log('Found idCommande:', results[0].idCommande);
          return results[0].idCommande;
        }
      } catch (error) {
        console.error('Error executing findIdCommandeByIdClient query:', error);
        throw error;
      }
    },
};

module.exports = Commande;
