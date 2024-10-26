const express = require('express');
const cors = require('cors');
const db = require('./dbConfig');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// User Signup
app.post('/api/signup', (req, res) => {
  console.log('Received signup request:', req.body);
  const { username, uuid, securityQuestion, securityAnswer } = req.body;
  const query = 'INSERT INTO users (username, uuid, security_question, security_answer) VALUES (?, ?, ?, ?)';
  db.query(query, [username, uuid, securityQuestion, securityAnswer], (err) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Failed to create user.' });
    }
    console.log('User created successfully.');
    res.status(201).json({ message: 'User created successfully.' });
  });
});

// User Login
app.post('/api/login', (req, res) => {
  console.log('Received login request:', req.body);
  const { username, securityQuestion, securityAnswer } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND security_question = ? AND security_answer = ?';
  db.query(query, [username, securityQuestion, securityAnswer], (err, result) => {
    if (err || result.length === 0) {
      console.error('Invalid login details:', err);
      return res.status(401).json({ error: 'Invalid login details.' });
    }
    console.log('Login successful for user:', result[0].username);
    res.status(200).json({ message: 'Login successful.', username: result[0].username });
  });
});

// Add a Transaction
app.post('/api/transactions', (req, res) => {
  const { title, amount, category, type, date, username } = req.body;
  console.log('Adding transaction for user:', username, { title, amount, category, type, date });

  const query = 'INSERT INTO transactions (title, amount, category, type, date, username) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, amount, category, type, date, username], (err, results) => {
    if (err) {
      console.error('Error adding transaction:', err);
      return res.status(500).json({ error: 'Failed to add transaction.' });
    }
    console.log('Transaction added:', results);
    res.status(201).json({ message: 'Transaction added successfully' });
  });
});

// Fetch Transactions for a User
app.get('/api/transactions', (req, res) => {
  const { username } = req.query; // Make sure the frontend sends the username as a query parameter.
  if (!username) {
    return res.status(400).json({ error: 'Username is required to fetch transactions.' });
  }

  console.log('Fetching transactions for user:', username);

  const query = 'SELECT * FROM transactions WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      return res.status(500).json({ error: 'Failed to fetch transactions.' });
    }
    console.log('Fetched transactions:', results);
    res.json(results);
  });
});




//api test route


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
