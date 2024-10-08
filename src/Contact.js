// Contact.js
import React from 'react';
import ContactForm from './ContactForm';
import './Contact.css';

// Import PNG and SVG icons
import LinkedInIcon from './assets/linkedin-icon.png';
import InstagramIcon from './assets/outlook-icon.png';
import { ReactComponent as GmailIcon } from './assets/gmail-icon.svg'; // Import SVG as a React component

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Me</h1>
      <p>If you have any questions, feel free to reach out using the form below.</p>
      <ContactForm />

      <div className="alternative-contact">
        <p>Alternatively, you can reach me at:</p>
        <div className="social-links">
          {/* Use the SVG as a component */}
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com" target="_blank" rel="noopener noreferrer">
            <GmailIcon className="icon svg-icon" /> {/* SVG */}
          </a>
          {/* Use the PNG icons */}
          <a href="https://www.linkedin.com/in/your-profile/" target="_blank" rel="noopener noreferrer">
            <img src={LinkedInIcon} alt="LinkedIn" className="icon" /> {/* PNG */}
          </a>
          <a href="https://outlook.live.com/mail/0/deeplink/compose?to=your-email@outlook.com" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" className="icon" /> {/* PNG */}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
