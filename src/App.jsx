import React from 'react';

// Component imports - organized by functionality
import Navbar from './components/Navbar';
import TechBackground from './components/TechBackground';
import DeploymentInfo from './components/DeploymentInfo';

// Page sections
import Hero from './components/Hero';
import About from './components/About';
import Service from './components/Service';
import Projects from './components/Projects';
import Contact from './components/Contact';

/**
 * App Component
 * 
 * Main application component that orchestrates the entire portfolio layout.
 * Uses TechBackground wrapper for each section to provide consistent animated backgrounds
 * while maintaining section-specific visual variations.
 * 
 * Architecture:
 * - Fixed navigation at the top
 * - Main content sections wrapped in TechBackground components
 * - Each section has unique background configurations
 * 
 * @component
 */
function App() {
  return (
    <div className="relative">
      {/* Fixed Navigation */}
      <Navbar />
      
      {/* Main Content Sections */}
      <main>
        {/* Hero Section - Landing/Introduction */}
        <TechBackground section="hero">
          <Hero />
        </TechBackground>
        
        {/* About Section - Personal & Professional Info */}
        <TechBackground section="about">
          <About />
        </TechBackground>
        
        {/* Services Section - Skills & Expertise */}
        <TechBackground section="services">
          <Service />
        </TechBackground>
        
        {/* Projects Section - Portfolio Showcase */}
        <TechBackground section="projects">
          <Projects />
        </TechBackground>
        
        {/* Contact Section - Communication & Social */}
        <TechBackground section="contact">
          <Contact />
        </TechBackground>
      </main>
      
      {/* Deployment Info - CI/CD Testing */}
      <DeploymentInfo />
    </div>
  );
}

export default App;
