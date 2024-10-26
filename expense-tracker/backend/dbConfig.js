require('dotenv').config(); // Loads environment variables from .env file

const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'expense_tracker',
  port: process.env.DB_PORT || 3306,  // Default MySQL port
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
