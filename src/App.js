
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  './App.css'; // Import other components
import About from './About';
import Contact from './Contact'; // Import the Contact page
import ProjectsPage from './ProjectsPage';





function App() {
  const [theme, setTheme] = useState('dark'); // Set the default theme to dark
  const [typedText1, setTypedText1] = useState(''); // For the first sentence
  const [typedText2, setTypedText2] = useState(''); // For the second sentence
  const [typedText3, setTypedText3] = useState(''); // For the third sentence
  const [isTypingText1Done, setIsTypingText1Done] = useState(false); // Track when first typing is done
  const [isTypingText2Done, setIsTypingText2Done] = useState(false); // Track when second typing is done
  const [isTypingDone, setIsTypingDone] = useState(false); // Track when all typing is done

  const textToType1 = "Hi, I'm Shreya Banwaskar"; // First text
  const textToType2 = 'Welcome to my Portfolio!'; // Second text
  const textToType3 = 'Where Creativity Meets Code!'; // Third text

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Apply theme to document root using CSS variables and change cursor color
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg-color', '#F0F3F4');
      document.documentElement.style.setProperty('--text-color', '#2C3E50');
      document.documentElement.style.setProperty('--accent-color', '#3c83e7');
      document.documentElement.style.setProperty('--cursor-color', '#2C3E50'); // Light theme cursor color
    } else {
      document.documentElement.style.setProperty('--bg-color', '#2C3E50');
      document.documentElement.style.setProperty('--text-color', '#F0F3F4');
      document.documentElement.style.setProperty('--accent-color', '#3c83e7');
      document.documentElement.style.setProperty('--cursor-color', '#F0F3F4'); // Dark theme cursor color (white)
    }
  }, [theme]);

  // Function to type each character with setTimeout for the first sentence
  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    let index3 = 0;

    const typeNextCharacter1 = () => {
      if (index1 < textToType1.length) {
        setTypedText1(textToType1.slice(0, index1 + 1));
        index1++;
        setTimeout(typeNextCharacter1, 150); // Recursively call the function with a delay
      } else {
        setTimeout(() => {
          setIsTypingText1Done(true);
          typeNextCharacter2();
        }, 500); // Start typing the second line after a delay
      }
    };

    const typeNextCharacter2 = () => {
      if (index2 < textToType2.length) {
        setTypedText2(textToType2.slice(0, index2 + 1));
        index2++;
        setTimeout(typeNextCharacter2, 150);
      } else {
        setTimeout(() => {
          setIsTypingText2Done(true);
          typeNextCharacter3();
        }, 500); // Start typing the third line after a delay
      }
    };

    const typeNextCharacter3 = () => {
      if (index3 < textToType3.length) {
        setTypedText3(textToType3.slice(0, index3 + 1));
        index3++;
        setTimeout(typeNextCharacter3, 150);
      } else {
        setIsTypingDone(true); // Mark all typing as done
      }
    };

    typeNextCharacter1(); // Start typing the first line on component mount
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Top Navigation Bar */}
        <header className="header">
          <nav className="navbar">
            <h1 className="logo">Shreya Banwaskar</h1>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Me</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            {/* Toggle Switch for light and dark themes */}
            <label className="switch">
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              <span className="slider round"></span>
            </label>
          </nav>
        </header>

        {/* Routing Configuration */}
        <Routes>
          <Route exact path="/" element={
            <section id="home" className="hero">
              <div className="intro">
                {/* Typewriter effect for the first heading */}
                <h2>
                  <span className={`typewriter-text ${isTypingText1Done ? 'typing-done' : ''}`}>
                    {typedText1}
                  </span>
                </h2>
                {/* Typewriter effect for the second heading */}
                <h3>
                  <span className={`typewriter-text ${isTypingText2Done ? 'typing-done' : ''}`}>
                    {typedText2}
                  </span>
                </h3>
                {/* Typewriter effect for the third heading */}
                <h3>
                  <span className={`typewriter-text ${isTypingDone ? 'typing-done' : ''}`}>
                    {typedText3}
                  </span>
                </h3>
              </div>
              <div className="gif-container">
                <img
                  src="https://user-images.githubusercontent.com/74038190/221352975-94759904-aa4c-4032-a8ab-b546efb9c478.gif"
                  alt="Shreya Banwaskar Development GIF"
                  className="hero-gif"
                />
              </div>
            </section>
          } />
          <Route path="/about" element={<About />} />
          {/* Add placeholders for Projects and Contact components */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <footer id="contact" className="footer">
          <p>Shreya Banwaskar © 2024</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
