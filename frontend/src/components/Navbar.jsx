import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle body scroll when mobile menu is open/closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-md' 
          : 'bg-[#09090b]/40 backdrop-blur-sm border-b border-zinc-800/30'
      } ${isMobileMenuOpen ? 'bg-transparent border-b-0' : ''}`}>
        <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}>
          <div className='flex justify-between items-center h-16 sm:h-18 md:h-20'>
            {/* Logo */}
            <div className='text-lg sm:text-xl md:text-2xl font-mono font-bold tracking-tight text-white'>
              &lt;<span className="text-indigo-400">Virtus</span>/&gt;
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex space-x-6 xl:space-x-8'>
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className='text-zinc-400 hover:text-white transition-colors duration-200 capitalize relative group text-sm xl:text-base cursor-pointer'
                >
                  {item}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200'></span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className='hidden lg:block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 xl:px-5 xl:py-2 rounded-lg transition-colors duration-200 cursor-pointer text-sm shadow-sm'
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 md:right-8 z-50'>
          <button
            className='text-white focus:outline-none p-2 relative z-50'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
          >
            <div className='relative w-6 h-6 flex flex-col justify-center items-center'>
              <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? 'rotate-45 bg-indigo-400' : '-translate-y-2'
              }`}></span>
              <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}></span>
              <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? '-rotate-45 bg-indigo-400' : 'translate-y-2'
              }`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 w-screen h-screen transition-all duration-300 ease-out z-40 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#09090b]/95 backdrop-blur-xl border-b border-zinc-800" />

        {/* Menu Content */}
        <div 
          className={`relative w-full h-full flex flex-col justify-center items-center px-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='space-y-4 text-center w-full max-w-xs'>
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <div key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className='w-full text-zinc-300 hover:text-white hover:bg-zinc-900/60 transition-all duration-200 capitalize py-3 px-6 text-lg font-medium rounded-lg border border-transparent hover:border-zinc-800'
                >
                  {item}
                </button>
              </div>
            ))}
            
            <div className='pt-6'>
              <button 
                onClick={() => scrollToSection('contact')}
                className='w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-base shadow-sm'
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;