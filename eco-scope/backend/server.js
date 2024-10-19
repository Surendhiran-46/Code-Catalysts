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

// server.js

app.post('/api/calculate-co2', (req, res) => {
  const { energyConsumption, carbonEmissions, waterUsage, wasteGenerated } = req.body;

  // Perform CO2 Emissions Calculation
  const co2PerKwh = 0.5; // Example: 0.5 kg CO2e per kWh
  const co2Estimate = parseFloat(energyConsumption) * co2PerKwh;

  // Example analysis calculations
  const carKmEquivalent = co2Estimate * 1.6; // Example: 1.6 km per kg CO2e
  const waterUsageEquivalent = parseFloat(waterUsage) / 20; // 20 liters per shower
  const wasteRecyclingPotential = (wasteGenerated * 0.3); // Assume 30% recycling potential

  // Response with analysis report
  const report = {
    co2Estimate: co2Estimate,
    carKmEquivalent: carKmEquivalent,
    waterUsageEquivalent: waterUsageEquivalent,
    wasteRecyclingPotential: wasteRecyclingPotential,
    recommendations: {
      energyEfficiency: `Reducing energy use by 10% can cut CO2 emissions by ${(co2Estimate * 0.1).toFixed(2)} kg.`,
      wasteManagement: `Implementing recycling could reduce landfill waste by ${wasteRecyclingPotential.toFixed(2)} kg.`,
      waterConservation: `Using water-efficient systems could save ${((parseFloat(waterUsage) * 0.1)).toFixed(2)} liters per day.`
    }
  };

  res.json(report);
});

// Route to get user data by ID
app.get('/api/user/:id', (req, res) => {
  const query = `SELECT first_name, last_name, email, company_name FROM users WHERE id = ?`;
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


// Route to fetch user details
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;

  const query = `SELECT * FROM users WHERE id = ?`;

  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
});

// Route to update user details
app.put('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, companyName } = req.body;

  const query = `UPDATE users SET first_name = ?, last_name = ?, email = ?, company_name = ? WHERE id = ?`;

  db.run(query, [firstName, lastName, email, companyName, userId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }

    // Return the updated user details to the frontend
    res.json({ 
      message: 'User details updated successfully!',
      firstName,
      lastName,
      email,
      companyName
    });
  });
});

