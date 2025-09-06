import React, { useState, useEffect, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown } from 'react-icons/fa';
import HeroImage from '../assets/hero-image.png';

const Hero = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    
    const roles = useMemo(() => [
        'Full-Stack Developer',
        'Software Engineer',
        'React Specialist',
        'Problem Solver'
    ], []);

    useEffect(() => {
        const currentRole = roles[currentIndex];
        
        if (isTyping) {
            if (displayedText.length < currentRole.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(currentRole.slice(0, displayedText.length + 1));
                }, 100);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
                return () => clearTimeout(timeout);
            }
        } else {
            if (displayedText.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayedText(displayedText.slice(0, -1));
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                setCurrentIndex((prev) => (prev + 1) % roles.length);
                setIsTyping(true);
            }
        }
    }, [displayedText, currentIndex, isTyping, roles]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center relative overflow-hidden'>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className='container mx-auto px-6 md:px-16 lg:px-24 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between'>
                    {/* Content */}
                    <div className='lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0'>
                        <div className='mb-6'>
                            <p className='text-lg text-gray-300 mb-2'>Hello, I'm</p>
                            <h1 className='text-5xl md:text-7xl font-bold mb-4'>
                                <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent'>
                                    Virtus Dakura
                                </span>
                            </h1>
                            <div className='text-2xl md:text-3xl font-semibold text-gray-300 h-12 flex items-center justify-center lg:justify-start'>
                                <span>{displayedText}</span>
                                <span className='ml-1 animate-pulse'>|</span>
                            </div>
                        </div>

                        <p className='text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0'>
                            Passionate software engineer crafting innovative solutions with modern technologies. 
                            I build scalable applications and love solving complex problems through clean, efficient code.
                        </p>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8'>
                            <button 
                                onClick={() => scrollToSection('projects')}
                                className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer'
                            >
                                View My Work
                            </button>
                            <button className='border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer'>
                                <FaDownload />
                                Download CV
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className='flex justify-center lg:justify-start space-x-6'>
                            <a href='https://github.com/VirtusDakura' target='_blank' rel='noopener noreferrer' 
                               className='text-gray-400 hover:text-white text-2xl transform hover:scale-110 transition-all duration-300'>
                                <FaGithub />
                            </a>
                            <a href='https://linkedin.com/in/virtus-dakura' target='_blank' rel='noopener noreferrer' 
                               className='text-gray-400 hover:text-white text-2xl transform hover:scale-110 transition-all duration-300'>
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div className='lg:w-1/2 flex justify-center'>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse'></div>
                            <img 
                                src={HeroImage} 
                                alt="Virtus Dakura" 
                                className='relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-gray-700 shadow-2xl transform hover:scale-105 transition-transform duration-300'
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                    <button 
                        onClick={() => scrollToSection('about')}
                        className='text-gray-400 hover:text-white transition-colors duration-300'
                    >
                        <FaArrowDown size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;