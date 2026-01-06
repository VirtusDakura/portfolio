import React, { useState, useEffect, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown, FaTwitter, FaEnvelope } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getHero, urlFor } from '../utils/sanity';

// Fallback image
import HeroImageFallback from '../assets/hero-image.png';

const Hero = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fallback data
    const fallbackData = useMemo(() => ({
        name: 'Virtus Dakura',
        greeting: "Hello, I'm",
        roles: ['Full-Stack Developer', 'Software Engineer'],
        bio: "Passionate software engineer crafting innovative solutions with modern technologies. I build scalable applications and love solving complex problems through clean, efficient code.",
        profileImage: null,
        resumeUrl: '/resume.pdf',
        socialLinks: {
            github: 'https://github.com/VirtusDakura',
            linkedin: 'https://linkedin.com/in/virtus-dakura'
        }
    }), []);

    // Fetch hero data from Sanity
    useEffect(() => {
        async function fetchHero() {
            try {
                const data = await getHero();
                if (data) {
                    setHeroData(data);
                } else {
                    setHeroData(fallbackData);
                }
            } catch (error) {
                console.error('Error fetching hero data:', error);
                setHeroData(fallbackData);
            } finally {
                setLoading(false);
            }
        }
        fetchHero();
    }, [fallbackData]);

    const roles = useMemo(() => {
        return heroData?.roles?.length > 0 ? heroData.roles : fallbackData.roles;
    }, [heroData, fallbackData]);

    useEffect(() => {
        if (loading || !roles.length) return;

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
    }, [displayedText, currentIndex, isTyping, roles, loading]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Get data with fallbacks
    const data = heroData || fallbackData;
    const name = data.name || fallbackData.name;
    const greeting = data.greeting || fallbackData.greeting;
    const bio = data.bio || fallbackData.bio;
    const socialLinks = data.socialLinks || fallbackData.socialLinks;
    const resumeUrl = data.resumeFile?.asset?.url || '/resume.pdf';

    // Get profile image URL
    const profileImageUrl = data.profileImage
        ? urlFor(data.profileImage).width(600).height(600).url()
        : HeroImageFallback;

    if (loading) {
        return (
            <section id="home" className='min-h-screen text-white flex items-center justify-center relative pt-20 sm:pt-24 md:pt-28 lg:pt-20'>
                <div className='container mx-auto px-4 text-center'>
                    <div className='animate-pulse'>
                        <div className='h-16 bg-gray-700 rounded w-64 mx-auto mb-4'></div>
                        <div className='h-8 bg-gray-700 rounded w-48 mx-auto'></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="home" className='min-h-screen text-white flex items-center justify-center relative pt-20 sm:pt-24 md:pt-28 lg:pt-20'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12'>
                    {/* Content - Animate from left */}
                    <ScrollAnimation direction="left" delay={200} className='w-full lg:w-1/2 text-center lg:text-left'>
                        <div className='mb-4 sm:mb-6'>
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 mb-2'>{greeting}</p>
                            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 sm:mb-4 leading-tight'>
                                <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap'>
                                    {name}
                                </span>
                            </h1>
                            <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-300 h-8 sm:h-10 md:h-12 flex items-center justify-center lg:justify-start'>
                                <span>{displayedText}</span>
                                <span className='ml-1 animate-pulse'>|</span>
                            </div>
                        </div>

                        <p className='text-sm sm:text-base lg:text-lg text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0'>
                            {bio}
                        </p>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8 px-2 sm:px-0'>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base w-full sm:w-auto'
                            >
                                View My Work
                            </button>
                            <a
                                href={resumeUrl}
                                download="Virtus_Dakura_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base w-full sm:w-auto'
                            >
                                <FaDownload />
                                Download Resume
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className='flex justify-center lg:justify-start space-x-6'>
                            {socialLinks?.github && (
                                <a href={socialLinks.github} target='_blank' rel='noopener noreferrer'
                                    className='text-gray-400 hover:text-white text-xl sm:text-2xl transform hover:scale-110 transition-all duration-300'>
                                    <FaGithub />
                                </a>
                            )}
                            {socialLinks?.linkedin && (
                                <a href={socialLinks.linkedin} target='_blank' rel='noopener noreferrer'
                                    className='text-gray-400 hover:text-white text-xl sm:text-2xl transform hover:scale-110 transition-all duration-300'>
                                    <FaLinkedin />
                                </a>
                            )}
                            {socialLinks?.twitter && (
                                <a href={socialLinks.twitter} target='_blank' rel='noopener noreferrer'
                                    className='text-gray-400 hover:text-white text-xl sm:text-2xl transform hover:scale-110 transition-all duration-300'>
                                    <FaTwitter />
                                </a>
                            )}
                            {socialLinks?.email && (
                                <a href={`mailto:${socialLinks.email}`}
                                    className='text-gray-400 hover:text-white text-xl sm:text-2xl transform hover:scale-110 transition-all duration-300'>
                                    <FaEnvelope />
                                </a>
                            )}
                        </div>
                    </ScrollAnimation>

                    {/* Image - Animate from right */}
                    <ScrollAnimation direction="right" delay={400} className='w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0'>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse'></div>
                            <img
                                src={profileImageUrl}
                                alt={name}
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