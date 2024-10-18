// database/database.js

const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a table for storing user details
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    company_name TEXT
)`);

// Create a new table for storing environmental data
db.run(`CREATE TABLE IF NOT EXISTS environmental_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT,
    energy_consumption REAL,
    carbon_emissions REAL,
    water_usage REAL,
    waste_generated REAL
)`);

module.exports = db;
