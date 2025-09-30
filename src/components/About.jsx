import React, { useState, useEffect } from 'react';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDatabase, FaCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import AboutImage from '../assets/About.jpg';
import ScrollAnimation from './ScrollAnimation';

const About = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const techStack = [
        { name: 'React', icon: <FaReact className="text-blue-500" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Express', icon: <SiExpress className="text-gray-400" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
        { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-500" /> },
        { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
        { name: 'Python', icon: <FaPython className="text-blue-400" /> }
    ];

    const stats = [
        { number: '2+', label: 'Years Experience' },
        { number: '15+', label: 'Projects Completed' },
        { number: '8+', label: 'Technologies' },
        { number: '100%', label: 'Client Satisfaction' }
    ];

    // Lazy loading for image
    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = AboutImage;
    }, []);

    return (
        <section id='about' className='text-white py-12 sm:py-16 lg:py-20'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32'>
                <ScrollAnimation direction="up" delay={100} className='text-center mb-12 sm:mb-16'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                        About <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Me</span>
                    </h2>
                    <p className='text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0'>
                        Passionate software engineer with expertise in modern web technologies
                    </p>
                </ScrollAnimation>

                <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16'>
                    {/* Image Only */}
                    <ScrollAnimation direction="left" delay={200}>
                        <div className='relative'>
                            <div className='relative group'>
                                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                                {!imageLoaded && (
                                    <div className='relative w-full h-72 sm:h-96 lg:h-[28rem] xl:h-[32rem] rounded-2xl bg-gray-800 animate-pulse flex items-center justify-center'>
                                        <div className='text-gray-400'>Loading...</div>
                                    </div>
                                )}
                                <img 
                                    src={AboutImage} 
                                    alt="About Virtus Dakura" 
                                    className={`relative w-full h-72 sm:h-96 lg:h-[28rem] xl:h-[32rem] rounded-2xl object-cover shadow-2xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Content and Stats */}
                    <ScrollAnimation direction="right" delay={300}>
                        <div>
                            <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight'>
                                Crafting Digital Solutions with
                                <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'> Passion</span>
                            </h3>
                            <p className='text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base'>
                                I'm a passionate software engineer specializing in full-stack web development. 
                                With expertise in modern technologies, I create scalable applications that solve real-world problems.
                            </p>
                            <p className='text-gray-400 mb-8 sm:mb-12 leading-relaxed text-sm sm:text-base'>
                                My approach combines clean code practices with innovative thinking to deliver 
                                exceptional user experiences. I'm always exploring new technologies and 
                                methodologies to stay at the forefront of software development.
                            </p>
                            
                            {/* Stats Grid - Now under the text content */}
                            <div className='grid grid-cols-2 gap-4 sm:gap-6'>
                                {stats.map((stat, index) => (
                                    <div key={index} className='text-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700'>
                                        <h4 className='text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1 sm:mb-2'>{stat.number}</h4>
                                        <p className='text-gray-300 text-xs sm:text-sm'>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Technologies Section - Enhanced with proper positioning and responsive design */}
                <div className='w-full mt-8 sm:mt-12 lg:mt-16'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <ScrollAnimation direction="right" delay={400}>
                            <div className='text-center'>
                                <h4 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                                    Technologies I Work With
                                </h4>
                                
                                {/* Mobile: infinite auto-scrolling marquee of tech cards (keeps same visuals) */}
                                <div className='md:hidden relative mb-4'>
                                    <div className='mobile-marquee overflow-hidden px-4'>
                                        <div className='marquee-track flex items-center gap-4 min-w-[200%]' role='list' aria-label='Technologies I work with'>
                                            {/* Duplicate the techStack for seamless loop */}
                                            {Array.from({ length: 2 }).map((_, dup) => (
                                                techStack.map((tech, index) => (
                                                    <div key={`${dup}-${index}`} className='flex-shrink-0'>
                                                        <div className='bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-gray-600 transition-all duration-300 transform-gpu w-24 sm:w-28'>
                                                            <div className='text-2xl sm:text-3xl mb-3 flex justify-center'>
                                                                {tech.icon}
                                                            </div>
                                                            <p className='text-xs sm:text-sm text-gray-300 transition-colors duration-300 text-center font-medium'>
                                                                {tech.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Tablet Grid - Medium screens */}
                                <div className='hidden md:grid lg:hidden grid-cols-4 gap-6 mb-4'>
                                    {techStack.map((tech, index) => (
                                        <div key={index} className='group'>
                                            <div className='bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25'>
                                                <div className='text-3xl mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300'>
                                                    {tech.icon}
                                                </div>
                                                <p className='text-sm text-gray-300 group-hover:text-white transition-colors duration-300 text-center font-medium'>
                                                    {tech.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop Grid - Large screens */}
                                <div className='hidden lg:grid lg:grid-cols-8 gap-6'>
                                    {techStack.map((tech, index) => (
                                        <div key={index} className='group'>
                                            <div className='bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-600 hover:border-pink-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/25'>
                                                <div className='text-4xl mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300'>
                                                    {tech.icon}
                                                </div>
                                                <p className='text-sm text-gray-300 group-hover:text-white transition-colors duration-300 text-center font-medium'>
                                                    {tech.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;