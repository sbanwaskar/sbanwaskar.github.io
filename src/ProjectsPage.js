import React from 'react';
import Project from './Project';
import './ProjectsPage.css';




function ProjectsPage() {
  const projects = [
    {
      title: "Palindrome Builder",
      description: "A JavaScript application that allows users to build and check palindromes in real-time.",
      
      features: "Real-time palindrome validation, dynamic input feedback",
      liveDemo: "https://sbanwaskar.github.io/Palindrome_Checker/index.html",  // Replace with live demo link
      github: "https://github.com/sbanwaskar/sbanwaskar.github.io/tree/main/Palindrome_Checker",    // Replace with GitHub link
    },
    {
      title: "Roman Numeral Converter",
      description: "A tool for converting between Roman numerals and standard numbers.",
      features: "Bi-directional conversion, real-time results, responsive design",
      liveDemo: "https://sbanwaskar.github.io/Roman_Numeral_Coverter/index.html",  // Replace with live demo link
      github: "https://github.com/sbanwaskar/sbanwaskar.github.io/tree/main/Roman_Numeral_Coverter",    // Replace with GitHub link
    },
    {
      title: "Calculator",
      description: "A basic JavaScript calculator that performs arithmetic operations.",
      features: "Real-time calculations, simple UI, clear error handling",
      liveDemo: "https://sbanwaskar.github.io/Calculator/index.html",  // Replace with live demo link
      github: "https://github.com/sbanwaskar/sbanwaskar.github.io/tree/main/Calculator",    // Replace with GitHub link
    }
  ];

  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      <div className="projects-list">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project 
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              features={project.features}
              liveDemo={project.liveDemo}
              github={project.github}
            />
            {index !== projects.length - 1 && <hr className="project-divider" />} {/* Line between projects */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
