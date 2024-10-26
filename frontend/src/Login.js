// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://expense-track-backend-9991d860c1d6.herokuapp.com"; // Update with Heroku backend URL

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const securityQuestions = [
    'What is your favorite car?',
    'What is your favorite food?',
    'What is your place of birth?',
    'What is the name of your first pet?',
    'What is your favorite color?',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login initiated with:', { username, securityQuestion, securityAnswer });
    axios.post(`${API_BASE_URL}/api/login`, {
      username,
      securityQuestion,
      securityAnswer,
    })
      .then((response) => {
        console.log('Login successful:', response.data);
        onLogin(response.data.username);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="input"
        required
      />
      <select
        value={securityQuestion}
        onChange={(e) => setSecurityQuestion(e.target.value)}
        className="input"
        required
      >
        <option value="">Select your security question</option>
        {securityQuestions.map((question, index) => (
          <option key={index} value={question}>{question}</option>
        ))}
      </select>
      <input
        type="text"
        value={securityAnswer}
        onChange={(e) => setSecurityAnswer(e.target.value)}
        placeholder="Answer to security question"
        className="input"
        required
      />
      <button type="submit" className="btn-primary">Log In</button>
    </form>
  );
};

export default Login;
