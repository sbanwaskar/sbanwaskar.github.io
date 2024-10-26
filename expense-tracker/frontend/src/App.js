import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import Login from './Login';
import { jsPDF } from 'jspdf';
import TransactionVisualization from './TransactionVisualization';
import 'chart.js/auto';
import { useCallback } from 'react';


const API_BASE_URL = "https://expense-track-backend-9991d860c1d6.herokuapp.com"; // Update with the Heroku backend URL

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);

  // Wrap fetchTransactions in useCallback
const fetchTransactions = useCallback(async () => {
  try {
    if (!username) {
      console.log('No username provided.');
      return;
    }
    console.log(`Fetching transactions for username: ${username}`);
    const response = await axios.get(`https://expense-track-backend-9991d860c1d6.herokuapp.com/api/transactions?username=${username}`);
    console.log('Fetched transactions:', response.data);
    setTransactions(response.data);
    setError(null);
  } catch (error) {
    console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
    setError('Failed to fetch transactions.');
  }
}, [username]);

// Add fetchTransactions to useEffect dependency array
useEffect(() => {
  if (isLoggedIn) {
    fetchTransactions();
  }
}, [isLoggedIn, fetchTransactions]);

  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = {
        title,
        amount: parseFloat(amount),
        category,
        type,
        date,
        username,
      };
      const response = await axios.post(`${API_BASE_URL}/api/transactions`, newTransaction);
      console.log('Transaction added:', response.data);
      setMessage('Transaction added successfully!');
      fetchTransactions();
      setTitle('');
      setAmount('');
      setCategory('');
      setType('expense');
      setDate('');
    } catch (error) {
      console.error('Error adding transaction:', error.response ? error.response.data : error.message);
      setError('Failed to add transaction.');
    }
  };

  const handleLogin = (loggedInUsername) => {
    setUsername(loggedInUsername);
    setIsLoggedIn(true);
    setShowSignUp(false);
    fetchTransactions();
  };

  const handleSignUp = (signedUpUsername) => {
    setUsername(signedUpUsername);
    setIsLoggedIn(true);
    setShowSignUp(false);
    setMessage('Sign-up successful!');
  };

  const downloadTransactionsAsPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction List', 10, 10);
    transactions.forEach((transaction, index) => {
      doc.text(
        `${index + 1}. ${transaction.title} - $${transaction.amount} (${transaction.category}) on ${new Date(transaction.date).toLocaleDateString()}`,
        10,
        20 + index * 10
      );
    });
    doc.save('transactions.pdf');
  };

  const visualizeTransactions = () => {
    setShowVisualization(!showVisualization);
  };

  const downloadChartAsPNG = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'ExpensesChart.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };
  

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetchTransactions();
  //   }
  // }, [username, isLoggedIn]);
  

  return (
    <div className="App bg-gradient-to-r from-blue-900 via-gray-900 to-black text-white min-h-screen p-8 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-200 mb-6 text-center">Expense Tracker</h1>
        {isLoggedIn ? (
          <>
            <p className="mb-4 text-center">Welcome, {username}!</p>
            <h2 className="text-xl mb-2 text-center">Add Transaction</h2>
            <form onSubmit={addTransaction} className="space-y-4">
              <input
                type="text"
                placeholder="Enter transaction title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="input block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="input block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="input block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
              <button type="submit" className="btn-primary">Add Transaction</button>
            </form>
            {message && <p className="text-green-500 text-center mt-2">{message}</p>}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <button onClick={fetchTransactions} className="btn-primary mt-2">Show Transactions</button>
            <button onClick={visualizeTransactions} className="btn-primary mt-2">Visualize Transactions</button>
            <button onClick={downloadTransactionsAsPDF} className="btn-primary mt-2">Download Transactions as PDF</button>
            <button onClick={downloadChartAsPNG} className="btn-primary mt-2">Download Chart as PNG</button>
            <button onClick={() => setIsLoggedIn(false)} className="btn-primary mt-2 bg-red-500 hover:bg-red-600">Log Out</button>

            {transactions.length > 0 && (
              <div className="bg-white shadow-md rounded-lg p-4 mt-4 text-black">
                <h2 className="text-xl mb-2">Transactions</h2>
                <ul className="space-y-1">
                  {transactions.map((tx, index) => (
                    <li key={index} className="text-gray-700">
                      {tx.title} - ${tx.amount} ({tx.category}) on {new Date(tx.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showVisualization && (
              <TransactionVisualization transactions={transactions} />
            )}
          </>
        ) : (
          <>
            {showSignUp ? (
              <SignUp onSignUp={handleSignUp} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
            <button
              onClick={() => setShowSignUp(!showSignUp)}
              className="btn-secondary"
            >
              {showSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
