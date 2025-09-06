import React, { useState, useEffect, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown } from 'react-icons/fa';
import HeroImage from '../assets/hero-image.png';
import ScrollAnimation from './ScrollAnimation';

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
        <section id="home" className='min-h-screen text-white flex items-center justify-center relative'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12'>
                    {/* Content - Animate from left */}
                    <ScrollAnimation direction="left" delay={200} className='w-full lg:w-1/2 text-center lg:text-left'>
                        <div className='mb-4 sm:mb-6'>
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 mb-2'>Hello, I'm</p>
                            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 sm:mb-4 leading-tight'>
                                <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap'>
                                    Virtus Dakura
                                </span>
                            </h1>
                            <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-300 h-8 sm:h-10 md:h-12 flex items-center justify-center lg:justify-start'>
                                <span>{displayedText}</span>
                                <span className='ml-1 animate-pulse'>|</span>
                            </div>
                        </div>

                        <p className='text-sm sm:text-base lg:text-lg text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0'>
                            Passionate software engineer crafting innovative solutions with modern technologies. 
                            I build scalable applications and love solving complex problems through clean, efficient code.
                        </p>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8 px-2 sm:px-0'>
                            <button 
                                onClick={() => scrollToSection('projects')}
                                className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base w-full sm:w-auto'
                            >
                                View My Work
                            </button>
                            <button className='border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base w-full sm:w-auto'>
                                <FaDownload />
                                Download Resume
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className='flex justify-center lg:justify-start space-x-6'>
                            <a href='https://github.com/VirtusDakura' target='_blank' rel='noopener noreferrer' 
                               className='text-gray-400 hover:text-white text-xl sm:text-2xl transform hover:scale-110 transition-all duration-300'>
                                <FaGithub />
                            </a>
                            <a href='https://linkedin.com/in/virtus-dakura' target='_blank' rel='noopener noreferrer' 
                               className='text-gray-400 hover:text-white text-xl sm:text-2xl transform hover:scale-110 transition-all duration-300'>
                                <FaLinkedin />
                            </a>
                        </div>
                    </ScrollAnimation>

                    {/* Image - Animate from right */}
                    <ScrollAnimation direction="right" delay={400} className='w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0'>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse'></div>
                            <img 
                                src={HeroImage} 
                                alt="Virtus Dakura" 
                                className='relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] 2xl:w-[32rem] 2xl:h-[32rem] rounded-full object-cover border-4 border-gray-700 shadow-2xl transform hover:scale-105 transition-transform duration-300'
                            />
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Scroll Indicator */}
                <div className='absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                    <button 
                        onClick={() => scrollToSection('about')}
                        className='text-gray-400 hover:text-white transition-colors duration-300'
                    >
                        <FaArrowDown size={20} className='sm:hidden' />
                        <FaArrowDown size={24} className='hidden sm:block' />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;