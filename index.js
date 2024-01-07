// Import necessary libraries and modules
const express = require('express');
const mysql = require('mysql2');
const util = require('util');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize'); 
const cors=require("cors");
const categorieRoutes = require('./routes/categorieRoutes');
const app = express();
app.use(cors());
const clientRoutes = require('./routes/clientRoutes');
const vendeurRoutes = require('./routes/vendeurRoutes');
const produitRoutes = require('./routes/produitRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const port = 3002;

app.use('/api/categories', categorieRoutes);


// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'benetlafar',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Set up middleware

app.use(bodyParser.json());


// Utilisation des routes
app.use('/api/clients', clientRoutes);
app.use('/api/vendeurs', vendeurRoutes);
app.use('/api/produits', produitRoutes);
// app.use('/api/commandes', commandeRoutes);

app.set('db', db);

// Promisify the query method
db.query = util.promisify(db.query);

// Define a query function
const query = async (sql, values) => {
  try {
    const results = await db.query(sql, values);
    return results;
  } catch (error) {
    throw error;
  }
};

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


// Export the database connection and the query function
// module.exports = { db, query }