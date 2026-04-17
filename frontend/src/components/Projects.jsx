import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createPortal } from 'react-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getProjects, urlFor } from '../utils/sanity';
import { getIcon, getIconColor } from '../utils/iconMap';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile'];

    const { data: projects = [], isLoading: loading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const data = await getProjects();
            return data || [];
        }
    });

    const error = isError ? 'Failed to load projects' : null;

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    // Filter out categories that have no projects
    const availableCategories = categories.filter(cat =>
        cat === 'All' || projects.some(p => p.category === cat)
    );

    const openModal = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            // Prevent scrolling on both html and body
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            // Prevent touch scroll on mobile
            const preventScroll = (e) => {
                // Allow scrolling inside the modal content
                const modalContent = document.querySelector('.modal-content');
                if (modalContent && modalContent.contains(e.target)) {
                    return;
                }
                e.preventDefault();
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            };

            document.addEventListener('touchmove', preventScroll, { passive: false });
            document.addEventListener('wheel', preventScroll, { passive: false });
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.removeEventListener('touchmove', preventScroll);
                document.removeEventListener('wheel', preventScroll);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [selectedProject]);



    if (loading) {
        return (
            <section id='projects' className='text-white py-12 sm:py-16 lg:py-20'>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32'>
                    <div className='text-center'>
                        <div className='animate-pulse'>
                            <div className='h-12 bg-gray-700 rounded w-64 mx-auto mb-4'></div>
                            <div className='h-6 bg-gray-700 rounded w-96 mx-auto mb-8'></div>
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className='bg-gray-800 rounded-2xl h-80'></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || projects.length === 0) {
        return (
            <section id='projects' className='text-white py-12 sm:py-16 lg:py-20'>
                <div className='container mx-auto px-4 text-center'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                        Featured <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Projects</span>
                    </h2>
                    <p className='text-gray-400 text-lg'>
                        {error || 'No projects available yet. Check back soon!'}
                    </p>
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
                                        <ProjectCard 
                                            key={project._id}
                                            project={project}
                                            openModal={openModal}
                                            isMobile={true}
                                        />
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
                            <ProjectCard 
                                key={project._id}
                                project={project}
                                openModal={openModal}
                                isMobile={false}
                            />
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

            {/* Project Modal - Using Portal to render outside component hierarchy */}
            {selectedProject && createPortal(
                <div
                    className='fixed inset-0 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-[2px]'
                    style={{ zIndex: 99999 }}
                    onClick={(e) => {
                        // Close modal when clicking on backdrop (not content)
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                    onTouchMove={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className='modal-content bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto'>
                        <div className='relative'>
                            <img
                                src={selectedProject.image ? urlFor(selectedProject.image).width(1200).url() : ''}
                                alt={selectedProject.name}
                                className='w-full h-48 sm:h-64 object-cover rounded-t-2xl'
                            />
                            <button
                                onClick={closeModal}
                                aria-label="Close modal"
                                className='absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all duration-300 cursor-pointer'
                            >
                                ✕
                            </button>
                        </div>
                        <div className='p-4 sm:p-6 lg:p-8'>
                            <h3 id="modal-title" className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
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
                </div>,
                document.body
            )}
        </section>
    );
};

export default Projects;