// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to handle user registration
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password, companyName } = req.body;

  const query = `INSERT INTO users (first_name, last_name, email, password, company_name) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [firstName, lastName, email, password, companyName], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User registered successfully!', userId: this.lastID });
  });
});

// Route to handle user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  
  db.get(query, [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Incorrect Username or Password' });
    }
    res.json({ message: 'Login successful!', userId: row.id });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
