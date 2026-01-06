import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getProjects, urlFor } from '../utils/sanity';
import { getIcon, getIconColor } from '../utils/iconMap';

// Fallback data for when Sanity hasn't been populated yet
import PortfolioImage from '../assets/portfolio.png';
import SanichFarmsImage from '../assets/sanichfarms.png';

const fallbackProjects = [
    {
        _id: '1',
        name: 'Sanich Farms',
        description: 'A comprehensive e-commerce and service platform for a poultry farming business, featuring product sales, farm services, and customer management.',
        longDescription: 'Full-stack e-commerce and service platform developed for Sanich Farms, a poultry farming business. As the full-stack developer and project manager, I led a team to build a complete solution with product catalog, service booking, order management, and customer portal. Features include secure payment processing, real-time inventory tracking, service appointment scheduling, and an admin dashboard for business operations.',
        technologies: [
            { name: 'React', icon: 'react', color: 'text-blue-500' },
            { name: 'Vite', icon: 'vite', color: 'text-purple-500' },
            { name: 'Tailwind CSS', icon: 'tailwind', color: 'text-cyan-500' },
            { name: 'Node.js', icon: 'nodejs', color: 'text-green-500' },
            { name: 'Express', icon: 'express', color: 'text-gray-400' },
            { name: 'PostgreSQL', icon: 'postgresql', color: 'text-blue-600' },
            { name: 'Figma', icon: 'figma', color: 'text-pink-500' }
        ],
        localImage: SanichFarmsImage,
        github: 'https://github.com/Sprint-Force/Sanich-Farms',
        demo: 'https://sanich-farms.vercel.app/',
        category: 'Full-Stack',
        featured: true
    },
    {
        _id: '2',
        name: 'Personal Portfolio',
        description: 'A modern, responsive portfolio website showcasing my projects, skills, and experience with immersive animations and tech-aesthetic design.',
        longDescription: 'My personal portfolio built with cutting-edge frontend technologies. Features include smooth scroll animations, dynamic particle backgrounds, responsive design optimized for all devices, and an interactive project showcase. The site demonstrates modern web development practices with performance optimization, accessibility features, and a futuristic tech aesthetic.',
        technologies: [
            { name: 'React', icon: 'react', color: 'text-blue-500' },
            { name: 'Vite', icon: 'vite', color: 'text-purple-500' },
            { name: 'Tailwind CSS', icon: 'tailwind', color: 'text-cyan-500' }
        ],
        localImage: PortfolioImage,
        github: 'https://github.com/VirtusDakura/portfolio',
        demo: 'https://virtus-dakura.vercel.app/',
        category: 'Frontend',
        featured: true
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile'];

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects();
                if (data && data.length > 0) {
                    setProjects(data);
                } else {
                    // Use fallback data if no projects in Sanity
                    setProjects(fallbackProjects);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    // Filter out categories that have no projects
    const availableCategories = categories.filter(cat =>
        cat === 'All' || projects.some(p => p.category === cat)
    );

    const openModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    // Helper function to get image URL
    const getImageUrl = (project) => {
        if (project.image) {
            return urlFor(project.image).width(800).url();
        }
        return project.localImage;
    };

    if (loading) {
        return (
            <section id='projects' className='text-white py-12 sm:py-16 lg:py-20'>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32'>
                    <div className='text-center'>
                        <div className='animate-pulse'>
                            <div className='h-12 bg-gray-700 rounded w-64 mx-auto mb-4'></div>
                            <div className='h-6 bg-gray-700 rounded w-96 mx-auto'></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id='projects' className='text-white py-12 sm:py-16 lg:py-20'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32'>
                <ScrollAnimation direction="up">
                    <div className='text-center mb-12 sm:mb-16'>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                            Featured <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Projects</span>
                        </h2>
                        <p className='text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0'>
                            Showcasing my latest work in web development, mobile apps, and innovative solutions
                        </p>

                        {/* Filter Buttons */}
                        <div className='flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-0'>
                            {availableCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base ${filter === category
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                            : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
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
                                    {filteredProjects.map((project) => (
                                        <div
                                            key={project._id}
                                            className='group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 flex-shrink-0 w-80 sm:w-96'
                                        >
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
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Desktop Grid */}
                <ScrollAnimation direction="right">
                    <div className='hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8'>
                        {filteredProjects.map((project) => (
                            <div
                                key={project._id}
                                className='group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105'
                            >
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
                                        {project.technologies?.map((tech, index) => (
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
                        ))}
                    </div>
                </ScrollAnimation>

                {/* View All Projects Button */}
                <ScrollAnimation direction="up">
                    <div className='text-center mt-8 sm:mt-12'>
                        <a
                            href='https://github.com/VirtusDakura'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer text-sm sm:text-base'
                        >
                            <FaGithub />
                            View All Projects
                        </a>
                    </div>
                </ScrollAnimation>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm'>
                    <div className='bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto'>
                        <div className='relative'>
                            <img
                                src={getImageUrl(selectedProject)}
                                alt={selectedProject.name}
                                className='w-full h-48 sm:h-64 object-cover rounded-t-2xl'
                            />
                            <button
                                onClick={closeModal}
                                className='absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all duration-300 cursor-pointer'
                            >
                                ✕
                            </button>
                        </div>
                        <div className='p-4 sm:p-6 lg:p-8'>
                            <h3 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                                {selectedProject.name}
                            </h3>
                            <p className='text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base'>
                                {selectedProject.longDescription || selectedProject.description}
                            </p>
                            <div className='flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6'>
                                {selectedProject.technologies?.map((tech, index) => (
                                    <div key={index} className='flex items-center gap-2 bg-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-full'>
                                        <span className='text-sm sm:text-base'>
                                            {getIcon(tech.icon, tech.color || getIconColor(tech.icon))}
                                        </span>
                                        <span className='text-white text-sm sm:text-base'>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                                {selectedProject.github && (
                                    <a
                                        href={selectedProject.github}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base'
                                    >
                                        <FaGithub />
                                        View Code
                                    </a>
                                )}
                                {selectedProject.demo && (
                                    <a
                                        href={selectedProject.demo}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base'
                                    >
                                        <FaExternalLinkAlt />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;