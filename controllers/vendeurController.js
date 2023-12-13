// controllers/utilisateurController.js
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// Register a new vendeur
exports.registerVendeur = (req, res, db) => {
  const { username, email, password } = req.body;

  // Generate a random idVendeur using uuid
  const idVendeur = uuid.v4();

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Insert the vendeur into the database
    const sql = 'INSERT INTO vendeur (idVendeur, username, email, password) VALUES (?, ?, ?, ?)';
    const values = [idVendeur, username, email, hash];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error registering vendeur:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'Vendeur registered successfully', idVendeur: result.insertId });
    });
  });
};

// Vendeur login
exports.loginVendeur = (req, res, db) => {
  const { email, password } = req.body;

  // Fetch the vendeur from the database by email
  const sql = 'SELECT * FROM vendeur WHERE email = ?';
  const values = [email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error fetching vendeur:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const vendeur = results[0];

    // Compare the provided password with the hashed password from the database
    bcrypt.compare(password, vendeur.password, (err, passwordMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (passwordMatch) {
        // Passwords match, vendeur is logged in
        res.json({ message: 'Vendeur logged in successfully', vendeurId: vendeur.idVendeur });
      } else {
        // Passwords do not match
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
};