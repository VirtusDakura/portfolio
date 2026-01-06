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

// Fallback skills data
const fallbackServices = [
    {
        _id: '1',
        title: 'Frontend Development',
        description: 'Building responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.',
        icon: 'react',
        iconColor: 'text-blue-500',
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        gradientColor: 'from-blue-500 to-cyan-500'
    },
    {
        _id: '2',
        title: 'Backend Development',
        description: 'Creating robust server-side applications with Node.js, Express, and RESTful APIs.',
        icon: 'nodejs',
        iconColor: 'text-green-500',
        technologies: ['Node.js', 'Express', 'Python', 'REST APIs'],
        gradientColor: 'from-green-500 to-emerald-500'
    },
    {
        _id: '3',
        title: 'Database Design',
        description: 'Designing efficient database schemas and optimizing queries for better performance.',
        icon: 'database',
        iconColor: 'text-orange-500',
        technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma'],
        gradientColor: 'from-orange-500 to-red-500'
    },
    {
        _id: '4',
        title: 'Full-Stack Applications',
        description: 'End-to-end application development from concept to deployment.',
        icon: 'code',
        iconColor: 'text-purple-500',
        technologies: ['MERN Stack', 'Next.js', 'Prisma', 'Vercel'],
        gradientColor: 'from-purple-500 to-pink-500'
    },
    {
        _id: '5',
        title: 'Mobile Development',
        description: 'Cross-platform mobile applications using React Native and modern mobile technologies.',
        icon: 'mobile',
        iconColor: 'text-indigo-500',
        technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
        gradientColor: 'from-indigo-500 to-blue-500'
    },
    {
        _id: '6',
        title: 'DevOps & Deployment',
        description: 'Setting up CI/CD pipelines and deploying applications to cloud platforms.',
        icon: 'cloud',
        iconColor: 'text-cyan-500',
        technologies: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'],
        gradientColor: 'from-cyan-500 to-teal-500'
    }
];

const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const data = await getSkills();
                if (data && data.length > 0) {
                    setServices(data);
                } else {
                    setServices(fallbackServices);
                }
            } catch (error) {
                console.error('Error fetching skills:', error);
                setServices(fallbackServices);
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
                        <div className='h-6 bg-gray-700 rounded w-96 mx-auto'></div>
                    </div>
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