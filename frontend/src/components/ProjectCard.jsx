import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { getIcon, getIconColor } from '../utils/iconMap';
import { urlFor } from '../utils/sanity';

const ProjectCard = ({ project, openModal, isMobile = false }) => {
    const baseClasses = "group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105";
    const mobileClasses = "flex-shrink-0 w-80 sm:w-96";

    // Helper function to get image URL from Sanity
    const getImageUrl = (project) => {
        if (project.image) {
            return urlFor(project.image).width(800).url();
        }
        return null;
    };

    return (
        <div className={`${baseClasses} ${isMobile ? mobileClasses : ''}`}>
            {/* Featured Badge */}
            {project.featured && (
                <div className='absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold'>
                    Featured
                </div>
            )}

            {/* Image */}
            <div className='relative overflow-hidden'>
                <img
                    src={getImageUrl(project)}
                    alt={project.name}
                    className='w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60'></div>

                {/* Quick Actions */}
                <div className='absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex space-x-2'>
                        {project.github && (
                            <a
                                href={project.github}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='bg-black/50 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-lg hover:bg-black/70 transition-all duration-300 cursor-pointer'
                            >
                                <FaGithub size={14} className='sm:hidden' />
                                <FaGithub size={16} className='hidden sm:block' />
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='bg-black/50 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-lg hover:bg-black/70 transition-all duration-300 cursor-pointer'
                            >
                                <FaExternalLinkAlt size={14} className='sm:hidden' />
                                <FaExternalLinkAlt size={16} className='hidden sm:block' />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='p-4 sm:p-6'>
                <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300'>
                        {project.name}
                    </h3>
                    <span className='px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs'>
                        {project.category}
                    </span>
                </div>

                <p className='text-gray-400 mb-3 sm:mb-4 text-sm leading-relaxed'>
                    {project.description}
                </p>

                {/* Technologies */}
                <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
                    {project.technologies?.slice(0, 4).map((tech, index) => (
                        <div key={index} className='flex items-center gap-1 bg-gray-700/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full'>
                            <span className='text-xs sm:text-sm'>
                                {getIcon(tech.icon, tech.color || getIconColor(tech.icon))}
                            </span>
                            <span className='text-xs text-gray-300'>{tech.name}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className='flex justify-between items-center'>
                    <button
                        onClick={() => openModal(project)}
                        className='text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300 cursor-pointer'
                    >
                        View Details →
                    </button>
                    <div className='flex space-x-3'>
                        {project.github && (
                            <a
                                href={project.github}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-gray-400 hover:text-white transition-colors duration-300'
                            >
                                <FaGithub size={16} className='sm:hidden' />
                                <FaGithub size={18} className='hidden sm:block' />
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-gray-400 hover:text-white transition-colors duration-300'
                            >
                                <FaExternalLinkAlt size={16} className='sm:hidden' />
                                <FaExternalLinkAlt size={18} className='hidden sm:block' />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
