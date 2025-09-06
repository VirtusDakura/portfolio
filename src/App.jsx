import About from './components/About';
import Hero from './components/Hero';
import Service from './components/Service';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import TechBackground from './components/TechBackground';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <TechBackground section="hero">
          <Hero />
        </TechBackground>
        <TechBackground section="about">
          <About />
        </TechBackground>
        <TechBackground section="services">
          <Service />
        </TechBackground>
        <TechBackground section="projects">
          <Projects />
        </TechBackground>
        <TechBackground section="contact">
          <Contact />
        </TechBackground>
      </main>
    </div>
  );
}

export default App;
