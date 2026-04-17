import React from 'react';

// Component imports - organized by functionality
import Navbar from './components/Navbar';
import TechBackground from './components/TechBackground';

// Page sections
import Hero from './components/Hero';
import About from './components/About';
import Service from './components/Service';
import Projects from './components/Projects';
import Contact from './components/Contact';

/**
 * App Component
 * @component
 */
function App() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content - Ensure proper spacing for fixed navbar */}
      <main className="relative">
        <TechBackground>
          {/* Hero Section - Full Screen Landing */}
          <Hero />

          {/* About Section - Personal & Professional Info */}
          <About />

          {/* Services Section - Skills & Expertise */}
          <Service />

          {/* Projects Section - Portfolio Showcase */}
          <Projects />

          {/* Contact Section - Communication & Social */}
          <Contact />
        </TechBackground>
      </main>
    </div>
  );
}

export default App;
