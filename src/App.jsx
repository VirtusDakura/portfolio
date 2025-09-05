import About from './components/About';
import Hero from './components/Hero';
import Service from './components/Service';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Service />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
