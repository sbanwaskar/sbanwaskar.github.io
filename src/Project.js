import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'; // Importing icons

function Project({ title, description, features, liveDemo, github }) {
  return (
    <div className="project">
      <h2>{title}</h2>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Features:</strong> {features}</p>
      <div className="project-links">
        <a href={liveDemo} target="_blank" rel="noopener noreferrer">
          Live Demo <FaExternalLinkAlt />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer">
          View Code on GitHub <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default Project;
