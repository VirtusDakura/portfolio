import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getHero, urlFor } from '../utils/sanity';

const Hero = () => {
    const { data: heroData, isLoading: loading } = useQuery({
        queryKey: ['hero'],
        queryFn: getHero
    });

    const roles = useMemo(() => {
        return heroData?.roles?.length > 0 ? heroData.roles : ['Full-Stack Software Engineer'];
    }, [heroData]);

    // Typewriter effect
    const [displayText, setDisplayText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 2000;

    useEffect(() => {
        if (roles.length === 0) return;

        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && displayText === currentRole) {
            // Pause before deleting
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && displayText === '') {
            // Move to next role
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else if (isDeleting) {
            // Delete characters
            timeout = setTimeout(() => {
                setDisplayText(currentRole.substring(0, displayText.length - 1));
            }, deleteSpeed);
        } else {
            // Type characters
            timeout = setTimeout(() => {
                setDisplayText(currentRole.substring(0, displayText.length + 1));
            }, typeSpeed);
        }

        return () => clearTimeout(timeout);
    }, [displayText, roleIndex, isDeleting, roles]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const name = heroData?.name || 'Virtus Dakura';
    const bio = heroData?.bio || 'Passionate software engineer building high-performance web applications, scalable backend APIs, and modern user interfaces.';
    const socialLinks = heroData?.socialLinks || {};
    const resumeUrl = heroData?.resumeFile?.asset?.url || null;

    const profileImageUrl = heroData?.profileImage
        ? urlFor(heroData.profileImage).width(600).auto('format').url()
        : null;

    if (loading) {
        return (
            <section id="home" className='min-h-screen text-white flex items-center justify-center relative pt-24 pb-16'>
                <div className='container mx-auto px-4 text-center'>
                    <div className='animate-pulse flex flex-col lg:flex-row items-center justify-center gap-8'>
                        <div className='lg:w-7/12 text-left'>
                            <div className='h-6 bg-zinc-800 rounded w-48 mb-4'></div>
                            <div className='h-12 bg-zinc-800 rounded w-96 mb-4'></div>
                            <div className='h-6 bg-zinc-800 rounded w-64 mb-6'></div>
                            <div className='h-20 bg-zinc-800 rounded w-full max-w-xl'></div>
                        </div>
                        <div className='lg:w-5/12 flex justify-center'>
                            <div className='w-72 h-80 bg-zinc-800 rounded-2xl'></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="home" className='min-h-screen text-white flex items-center justify-center relative pt-24 sm:pt-28 pb-16'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16'>
                    {/* Left Column: Intro & Headline */}
                    <ScrollAnimation direction="left" delay={200} className='w-full lg:w-7/12 text-left order-2 lg:order-1'>


                        {/* Title & Headline */}
                        <div className='mb-6'>
                            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 leading-tight text-white tracking-tight'>
                                {name}
                            </h1>
                            <p className='text-lg sm:text-xl lg:text-2xl font-medium text-indigo-400 tracking-tight h-8 sm:h-9 lg:h-10'>
                                <span>{displayText}</span>
                                <span className='inline-block w-[2px] h-[1em] bg-indigo-400 ml-0.5 align-middle animate-pulse'></span>
                            </p>
                        </div>

                        {/* Brief Bio */}
                        <p className='text-base sm:text-lg text-zinc-400 mb-8 max-w-2xl leading-relaxed'>
                            {bio}
                        </p>

                        {/* Primary CTAs */}
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8'>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className='bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base'
                            >
                                <FaCode />
                                View Featured Work
                            </button>
                            <a
                                href={resumeUrl}
                                download="Virtus_Dakura_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='bg-zinc-900/90 border border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:text-white hover:bg-zinc-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base'
                            >
                                <FaDownload />
                                Download Resume
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className='flex items-center space-x-5 text-zinc-400 pt-2 border-t border-zinc-800/60 w-fit'>
                            <span className='text-xs uppercase tracking-wider text-zinc-500 font-semibold mr-2'>Connect</span>
                            {socialLinks?.github && (
                                <a href={socialLinks.github} target='_blank' rel='noopener noreferrer'
                                    className='hover:text-indigo-400 text-lg transition-colors duration-200'
                                    aria-label="GitHub Profile">
                                    <FaGithub />
                                </a>
                            )}
                            {socialLinks?.linkedin && (
                                <a href={socialLinks.linkedin} target='_blank' rel='noopener noreferrer'
                                    className='hover:text-indigo-400 text-lg transition-colors duration-200'
                                    aria-label="LinkedIn Profile">
                                    <FaLinkedin />
                                </a>
                            )}
                            {socialLinks?.twitter && (
                                <a href={socialLinks.twitter} target='_blank' rel='noopener noreferrer'
                                    className='hover:text-indigo-400 text-lg transition-colors duration-200'
                                    aria-label="Twitter Profile">
                                    <FaTwitter />
                                </a>
                            )}
                            {socialLinks?.email && (
                                <a href={`mailto:${socialLinks.email}`}
                                    className='hover:text-indigo-400 text-lg transition-colors duration-200'
                                    aria-label="Email Contact">
                                    <FaEnvelope />
                                </a>
                            )}
                        </div>
                    </ScrollAnimation>

                    {/* Right Column: Profile Portrait */}
                    <ScrollAnimation direction="right" delay={400} className='w-full lg:w-5/12 flex items-center justify-center order-1 lg:order-2'>
                        <div className='relative group flex items-center justify-center'>
                            {/* Outer ambient glow */}
                            <div className='absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-indigo-500/15 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none'></div>
                            
                            {/* Portrait */}
                            <div className='relative max-w-[280px] sm:max-w-[460px] lg:max-w-[540px] xl:max-w-[580px] w-full'>
                                <img
                                    src={profileImageUrl}
                                    alt={name}
                                    className='relative w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]'
                                    style={{
                                        maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 90%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 90%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                                        maskComposite: 'intersect',
                                        WebkitMaskComposite: 'source-in'
                                    }}
                                />
                            </div>

                            {/* Floating Location Pill */}
                            <div className='absolute bottom-6 sm:bottom-8 z-20'>
                                <span className='inline-flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900/95 border border-zinc-700/80 rounded-full shadow-xl backdrop-blur-md text-xs font-medium text-zinc-300'>
                                    <FaMapMarkerAlt className='text-indigo-400' /> Accra, Ghana
                                </span>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Scroll Indicator */}
                <div className='mt-16 sm:mt-20 flex justify-center'>
                    <button
                        onClick={() => scrollToSection('about')}
                        className='text-zinc-500 hover:text-white transition-colors duration-200 cursor-pointer p-2'
                        aria-label="Scroll to about section"
                    >
                        <FaArrowDown size={20} className='animate-bounce' />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;