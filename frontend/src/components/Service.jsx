import React, { useState, useEffect } from 'react';
import { FaCode, FaMobile, FaServer, FaDatabase, FaCloud, FaRocket } from 'react-icons/fa';
import { SiReact, SiNodedotjs } from 'react-icons/si';
import ScrollAnimation from './ScrollAnimation';
import { getSkills } from '../utils/sanity';

// Icon mapping for skills
const skillIconMap = {
    'code': FaCode,
    'mobile': FaMobile,
    'server': FaServer,
    'database': FaDatabase,
    'cloud': FaCloud,
    'rocket': FaRocket,
    'react': SiReact,
    'nodejs': SiNodedotjs,
};

const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const data = await getSkills();
                setServices(data || []);
            } catch (err) {
                console.error('Error fetching skills:', err);
                setError('Failed to load skills');
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();
    }, []);

    // Helper function to get icon component
    const getSkillIcon = (iconName, colorClass) => {
        const IconComponent = skillIconMap[iconName?.toLowerCase()] || FaCode;
        return <IconComponent className={colorClass} />;
    };

    if (loading) {
        return (
            <section id='skills' className='text-white py-12 sm:py-16 lg:py-20'>
                <div className='container mx-auto px-4 text-center'>
                    <div className='animate-pulse'>
                        <div className='h-12 bg-gray-700 rounded w-48 mx-auto mb-4'></div>
                        <div className='h-6 bg-gray-700 rounded w-96 mx-auto mb-8'></div>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className='bg-gray-800 rounded-2xl h-64'></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || services.length === 0) {
        return (
            <section id='skills' className='text-white py-12 sm:py-16 lg:py-20'>
                <div className='container mx-auto px-4 text-center'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                        My <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Skills</span>
                    </h2>
                    <p className='text-gray-400 text-lg'>
                        {error || 'No skills available yet. Check back soon!'}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id='skills' className='text-white py-12 sm:py-16 lg:py-20'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32'>
                <ScrollAnimation direction="up">
                    <div className='text-center mb-12 sm:mb-16'>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                            My <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Skills</span>
                        </h2>
                        <p className='text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0'>
                            Specialized expertise in modern software development technologies and practices
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Mobile/Tablet Horizontal Scroll */}
                <ScrollAnimation direction="left">
                    <div className='lg:hidden'>
                        <div className='relative'>
                            {/* Enhanced scroll indicators with bouncing animation */}
                            <div className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none'>
                                <div className='text-blue-400 text-3xl animate-bounce font-bold'>‹</div>
                            </div>

                            {/* Right scroll indicator arrow */}
                            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none'>
                                <div className='text-purple-400 text-3xl animate-bounce font-bold'>›</div>
                            </div>

                            <div className='overflow-x-auto pb-4 scroll-smooth scrollbar-hide'>
                                <div className='flex space-x-6 sm:space-x-8 min-w-max'>
                                    {services.map((service, index) => (
                                        <div
                                            key={service._id || index}
                                            className='group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden flex-shrink-0 w-80 sm:w-96'
                                        >
                                            {/* Background Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradientColor || 'from-blue-500 to-cyan-500'} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>

                                            {/* Content */}
                                            <div className='relative z-10'>
                                                {/* Icon */}
                                                <div className='text-3xl sm:text-4xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                                                    {getSkillIcon(service.icon, service.iconColor || 'text-blue-500')}
                                                </div>

                                                {/* Title */}
                                                <h3 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300'>
                                                    {service.title}
                                                </h3>

                                                {/* Description */}
                                                <p className='text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base'>
                                                    {service.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className='flex flex-wrap gap-2 mb-4 sm:mb-6'>
                                                    {service.technologies?.map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className='px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700 group-hover:border-gray-600 transition-colors duration-300'
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Get Started Link */}
                                                <button
                                                    onClick={scrollToContact}
                                                    className='flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer bg-transparent border-none p-0'
                                                >
                                                    <span className='text-sm font-medium'>Get Started</span>
                                                    <FaRocket className='ml-2 transform group-hover:translate-x-1 transition-transform duration-300' />
                                                </button>
                                            </div>

                                            {/* Number Badge */}
                                            <div className='absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold'>
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Desktop Grid */}
                <ScrollAnimation direction="right">
                    <div className='hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8'>
                        {services.map((service, index) => (
                            <div
                                key={service._id || index}
                                className='group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden'
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradientColor || 'from-blue-500 to-cyan-500'} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>

                                {/* Content */}
                                <div className='relative z-10'>
                                    {/* Icon */}
                                    <div className='text-3xl sm:text-4xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                                        {getSkillIcon(service.icon, service.iconColor || 'text-blue-500')}
                                    </div>

                                    {/* Title */}
                                    <h3 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300'>
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className='text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base'>
                                        {service.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className='flex flex-wrap gap-2 mb-4 sm:mb-6'>
                                        {service.technologies?.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className='px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700 group-hover:border-gray-600 transition-colors duration-300'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Get Started Link */}
                                    <button
                                        onClick={scrollToContact}
                                        className='flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer bg-transparent border-none p-0'
                                    >
                                        <span className='text-sm font-medium'>Get Started</span>
                                        <FaRocket className='ml-2 transform group-hover:translate-x-1 transition-transform duration-300' />
                                    </button>
                                </div>

                                {/* Number Badge */}
                                <div className='absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold'>
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollAnimation>

                {/* Call to Action */}
                <ScrollAnimation direction="up">
                    <div className='text-center mt-12 sm:mt-16'>
                        <p className='text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base px-4 sm:px-0'>
                            Interested in working together? Let's discuss your project.
                        </p>
                        <button
                            onClick={scrollToContact}
                            className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer text-sm sm:text-base'
                        >
                            Start a Project
                        </button>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export default Service;