// models/vendeur.js
const db = require('../index');

const Vendeur = {
  create: async (vendeurData) => {
    return new Promise((resolve, reject) => {
      const { username, email, password } = vendeurData;
      const query = 'INSERT INTO vendeurs (username, email, password) VALUES (?, ?, ?)';
      db.query(query, [username, email, password], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId);
      });
    });
  },

  findByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM vendeurs WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  findById: async (idVendeur) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM vendeurs WHERE idVendeur = ?';
      db.query(query, [idVendeur], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

};

module.exports = Vendeur;

