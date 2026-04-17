import React from 'react';
import { FaCode, FaMobile, FaServer, FaDatabase, FaCloud, FaRocket } from 'react-icons/fa';
import { SiReact, SiNodedotjs } from 'react-icons/si';

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

const getSkillIcon = (iconName, colorClass) => {
    const IconComponent = skillIconMap[iconName?.toLowerCase()] || FaCode;
    return <IconComponent className={colorClass} />;
};

const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const ServiceCard = ({ service, index, isMobile = false }) => {
    const baseClasses = "group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden";
    const mobileClasses = "flex-shrink-0 w-80 sm:w-96";
    
    return (
        <div className={`${baseClasses} ${isMobile ? mobileClasses : ''}`}>
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
    );
};

export default ServiceCard;
