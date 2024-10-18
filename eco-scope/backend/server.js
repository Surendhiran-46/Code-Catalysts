// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./database/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to handle user registration
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password, companyName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (first_name, last_name, email, password, company_name) 
                   VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [firstName, lastName, email, hashedPassword, companyName], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'User registered successfully!', userId: this.lastID });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to handle user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, row.password);
    
    if (isPasswordValid) {
      res.json({ message: 'Login successful!', userId: row.id });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

// New Route to handle environmental data submission
app.post('/api/environmental-data', (req, res) => {
  const { projectName, energyConsumption, carbonEmissions, waterUsage, wasteGenerated } = req.body;

  const query = `INSERT INTO environmental_data (project_name, energy_consumption, carbon_emissions, water_usage, waste_generated) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [projectName, energyConsumption, carbonEmissions, waterUsage, wasteGenerated], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Environmental data stored successfully!', dataId: this.lastID });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
