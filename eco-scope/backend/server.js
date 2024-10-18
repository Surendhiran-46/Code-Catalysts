const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submission
app.post('/api/register', (req, res) => {
  const { name, email, password, companyName, companyDetails } = req.body;

  const query = `INSERT INTO users (name, email, password, companyName, companyDetails) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [name, email, password, companyName, companyDetails], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User registered successfully!', userId: this.lastID });
  });
});

// Route to fetch user data
app.get('/api/users', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
