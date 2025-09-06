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
    
    // Cleanup function to ensure scroll is restored when component unmounts
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
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-gray-800/50' 
          : 'bg-transparent'
      } ${isMobileMenuOpen ? 'bg-transparent border-b-0' : ''}`}>
        <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}>
          <div className='flex justify-between items-center py-3 sm:py-4'>
            {/* Logo */}
            <div className='text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              &lt;Virtus/&gt;
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex space-x-6 xl:space-x-8'>
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className='text-gray-300 hover:text-white transition-colors duration-300 capitalize relative group text-sm xl:text-base'
                >
                  {item}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300'></span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className='hidden lg:block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 xl:px-6 xl:py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer text-sm xl:text-base'
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Mobile Menu Button - Always Visible */}
        <div className='lg:hidden absolute top-3 sm:top-4 right-4 sm:right-6 md:right-8'>
          <button
            className='text-white focus:outline-none p-2 relative z-50 group'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Tech Border */}
            <div className='absolute inset-0 border border-transparent group-hover:border-blue-400/30 rounded-lg transition-all duration-300'></div>
            
            {/* Hamburger Icon Container */}
            <div className='relative w-6 h-6 flex flex-col justify-center items-center'>
              {/* Top Line */}
              <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen 
                  ? 'rotate-45 bg-gradient-to-r from-blue-400 to-purple-400' 
                  : '-translate-y-2 group-hover:bg-blue-400'
              }`}></span>
              
              {/* Middle Line */}
              <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen 
                  ? 'opacity-0 scale-0' 
                  : 'opacity-100 scale-100 group-hover:bg-purple-400'
              }`}></span>
              
              {/* Bottom Line */}
              <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen 
                  ? '-rotate-45 bg-gradient-to-r from-purple-400 to-cyan-400' 
                  : 'translate-y-2 group-hover:bg-cyan-400'
              }`}></span>
              
              {/* Tech Glow Effect */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-150 blur-sm' 
                  : 'bg-transparent scale-100'
              }`}></div>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Modern Tech Design with Animations */}
      <div 
        className={`lg:hidden fixed inset-0 w-screen h-screen transition-all duration-500 ease-out z-40 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Animated Background with Tech Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          {/* Tech Grid Overlay */}
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }}>
          </div>
          {/* Animated Orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-75"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-500/20 rounded-full blur-lg animate-bounce delay-150"></div>
        </div>

        {/* Menu Content */}
        <div 
          className={`relative w-full h-full flex flex-col justify-center items-center px-6 transition-all duration-700 ease-out ${
            isMobileMenuOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Items Container */}
          <div className='space-y-6 text-center w-full max-w-xs'>
            {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
              <div
                key={item}
                className={`transform transition-all duration-500 ease-out ${
                  isMobileMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => scrollToSection(item)}
                  className='group relative w-full text-gray-300 hover:text-white transition-all duration-300 capitalize py-4 px-6 text-xl font-light overflow-hidden'
                >
                  {/* Animated Background */}
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-500 rounded-lg'></div>
                  
                  {/* Tech Border */}
                  <div className='absolute inset-0 border border-transparent group-hover:border-blue-400/30 rounded-lg transition-all duration-300'></div>
                  
                  {/* Glitch Effect Lines */}
                  <div className='absolute top-0 left-0 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-full transition-all duration-300 delay-75'></div>
                  <div className='absolute bottom-0 right-0 w-0 h-px bg-gradient-to-l from-transparent via-purple-400 to-transparent group-hover:w-full transition-all duration-300 delay-150'></div>
                  
                  {/* Tech Icon */}
                  <span className='relative flex items-center justify-center gap-3'>
                    <span className='w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse'></span>
                    <span className='tracking-wider'>{item}</span>
                    <span className='w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse delay-100'></span>
                  </span>
                  
                  {/* Scanning Line Effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12'></div>
                </button>
              </div>
            ))}
            
            {/* Mobile CTA Button - Enhanced */}
            <div className={`transform transition-all duration-700 ease-out mt-12 ${
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-8 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '600ms' }}>
              <button 
                onClick={() => scrollToSection('contact')}
                className='group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer text-lg font-medium hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105'
              >
                {/* Animated Background */}
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                
                {/* Tech Border Glow */}
                <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/50 via-purple-400/50 to-cyan-400/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                
                {/* Button Content */}
                <span className='relative flex items-center justify-center gap-2'>
                  <span className='w-2 h-2 bg-white rounded-full animate-pulse'></span>
                  <span className='tracking-wider'>Let's Connect</span>
                  <span className='w-2 h-2 bg-white rounded-full animate-pulse delay-100'></span>
                </span>
                
                {/* Scanning Effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12'></div>
              </button>
            </div>
          </div>
          
          {/* Tech Corner Accents */}
          <div className='absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-blue-400/50'></div>
          <div className='absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-purple-400/50'></div>
          <div className='absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50'></div>
          <div className='absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-blue-400/50'></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;