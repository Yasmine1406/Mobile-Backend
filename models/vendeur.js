// models/vendeur.js
const db = require('../index');


const Vendeur = {
  create: async (vendeurData) => {
    try {
      const { username, email, password } = vendeurData;
      const query = 'INSERT INTO vendeur (username, email, password) VALUES (?, ?, ?)';
      const results = await db.query(query, [username, email, password]);
      return results.insertId;
    } catch (err) {
      throw err;
    }

  },

  findByEmail: async (email) => {
    try {
      const query = 'SELECT * FROM vendeur WHERE email = ?';
      const results = await db.query(query, [email]);

      if (results.length === 0) {
        return null;
      } else {
        return results[0];
      }
    } catch (err) {
      throw err;
    }
  },

  findById: async (idVendeur,db) => {
    return new Promise((resolve,reject) => {
      const query = 'SELECT * FROM vendeur WHERE idVendeur = ?';
      db.query(query, [idVendeur], (err,results) => {
        if(err) {
          reject(err);
          return;
        }
        if (results.length === 0){
          resolve(null);
          } else {
            resolve(results[0]);
          }


      });

  });
},

};

module.exports = Vendeur;


