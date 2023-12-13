// controllers/utilisateurController.js
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// Register a new client
exports.registerClient = (req, res, db) => {
  const { username, email, password } = req.body;

  // Generate a random idClient using uuid
  const idClient = uuid.v4();

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Insert the client into the database
    const sql = 'INSERT INTO client (idClient, username, email, password) VALUES (?, ?, ?, ?)';
    const values = [idClient, username, email, hash];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error registering client:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'Client registered successfully', idClient: result.insertId });
    });
  });
};

// Client login
exports.loginClient = (req, res, db) => {
  const { email, password } = req.body;

  // Fetch the client from the database by email
  const sql = 'SELECT * FROM client WHERE email = ?';
  const values = [email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error fetching client:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const client = results[0];

    // Compare the provided password with the hashed password from the database
    bcrypt.compare(password, client.password, (err, passwordMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (passwordMatch) {
        // Passwords match, client is logged in
        res.json({ message: 'Client logged in successfully', clientId: client.idClient });
      } else {
        // Passwords do not match
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
};
