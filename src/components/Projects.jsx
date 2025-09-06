import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs, SiFirebase } from 'react-icons/si';
import ProjectImage1 from '../assets/Project1.png';
import ProjectImage2 from '../assets/Project2.png';
import ProjectImage3 from '../assets/Project3.png';

const projects = [
    {
        id: 1,
        name: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard. Features include shopping cart, order tracking, and inventory management.',
        longDescription: 'Built with the MERN stack, this e-commerce platform includes advanced features like real-time inventory updates, secure payment processing with Stripe, user reviews, and a comprehensive admin panel for managing products and orders.',
        technologies: [
            { name: 'React', icon: <FaReact className="text-blue-500" /> },
            { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
            { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
            { name: 'Express', icon: <SiExpress className="text-gray-400" /> }
        ],
        image: ProjectImage1,
        github: 'https://github.com/VirtusDakura/ecommerce-platform',
        demo: 'https://ecommerce-demo.virtus.dev',
        category: 'Full-Stack',
        featured: true
    },
    {
        id: 2,
        name: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration features, and progress tracking.',
        longDescription: 'This project management tool allows teams to create, assign, and track tasks in real-time. Features include drag-and-drop kanban boards, time tracking, file uploads, and team chat functionality.',
        technologies: [
            { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
            { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
            { name: 'Firebase', icon: <SiFirebase className="text-orange-500" /> },
            { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-500" /> }
        ],
        image: ProjectImage2,
        github: 'https://github.com/VirtusDakura/task-manager',
        demo: 'https://taskmanager.virtus.dev',
        category: 'Frontend',
        featured: true
    },
    {
        id: 3,
        name: 'AI Data Analytics Dashboard',
        description: 'An intelligent dashboard for data visualization and analytics with machine learning insights and predictive modeling.',
        longDescription: 'A comprehensive analytics platform that processes large datasets and provides actionable insights through interactive charts, machine learning predictions, and automated reporting features.',
        technologies: [
            { name: 'Python', icon: <FaPython className="text-blue-400" /> },
            { name: 'React', icon: <FaReact className="text-blue-500" /> },
            { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
            { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> }
        ],
        image: ProjectImage3,
        github: 'https://github.com/VirtusDakura/ai-analytics-dashboard',
        demo: 'https://analytics.virtus.dev',
        category: 'AI/ML',
        featured: false
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');
    
    const categories = ['All', 'Full-Stack', 'Frontend', 'AI/ML'];
    
    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(project => project.category === filter);

    const openModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <section id='projects' className='bg-gray-900 text-white py-20'>
            <div className='container mx-auto px-6 md:px-16 lg:px-24'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                        Featured <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Projects</span>
                    </h2>
                    <p className='text-gray-400 text-lg max-w-2xl mx-auto mb-8'>
                        Showcasing my latest work in web development, mobile apps, and innovative solutions
                    </p>
                    
                    {/* Filter Buttons */}
                    <div className='flex justify-center space-x-4 mb-8'>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                                    filter === category
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {filteredProjects.map((project) => (
                        <div 
                            key={project.id} 
                            className='group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105'
                        >
                            {/* Featured Badge */}
                            {project.featured && (
                                <div className='absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                                    Featured
                                </div>
                            )}

                            {/* Image */}
                            <div className='relative overflow-hidden'>
                                <img 
                                    src={project.image} 
                                    alt={project.name} 
                                    className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60'></div>
                                
                                {/* Quick Actions */}
                                <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <div className='flex space-x-2'>
                                        <a 
                                            href={project.github} 
                                            target='_blank' 
                                            rel='noopener noreferrer'
                                            className='bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all duration-300 cursor-pointer'
                                        >
                                            <FaGithub size={16} />
                                        </a>
                                        <a 
                                            href={project.demo} 
                                            target='_blank' 
                                            rel='noopener noreferrer'
                                            className='bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all duration-300 cursor-pointer'
                                        >
                                            <FaExternalLinkAlt size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <div className='flex items-center justify-between mb-2'>
                                    <h3 className='text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300'>
                                        {project.name}
                                    </h3>
                                    <span className='px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs'>
                                        {project.category}
                                    </span>
                                </div>
                                
                                <p className='text-gray-400 mb-4 text-sm leading-relaxed'>
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {project.technologies.map((tech, index) => (
                                        <div key={index} className='flex items-center gap-1 bg-gray-700/50 px-3 py-1 rounded-full'>
                                            <span className='text-sm'>{tech.icon}</span>
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
                                        <a 
                                            href={project.github} 
                                            target='_blank' 
                                            rel='noopener noreferrer'
                                            className='text-gray-400 hover:text-white transition-colors duration-300'
                                        >
                                            <FaGithub size={18} />
                                        </a>
                                        <a 
                                            href={project.demo} 
                                            target='_blank' 
                                            rel='noopener noreferrer'
                                            className='text-gray-400 hover:text-white transition-colors duration-300'
                                        >
                                            <FaExternalLinkAlt size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className='text-center mt-12'>
                    <a 
                        href='https://github.com/VirtusDakura' 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer'
                    >
                        <FaGithub />
                        View All Projects
                    </a>
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'>
                    <div className='bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
                        <div className='relative'>
                            <img 
                                src={selectedProject.image} 
                                alt={selectedProject.name} 
                                className='w-full h-64 object-cover rounded-t-2xl'
                            />
                            <button 
                                onClick={closeModal}
                                className='absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all duration-300 cursor-pointer'
                            >
                                ✕
                            </button>
                        </div>
                        <div className='p-8'>
                            <h3 className='text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                                {selectedProject.name}
                            </h3>
                            <p className='text-gray-400 mb-6 leading-relaxed'>
                                {selectedProject.longDescription}
                            </p>
                            <div className='flex flex-wrap gap-3 mb-6'>
                                {selectedProject.technologies.map((tech, index) => (
                                    <div key={index} className='flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full'>
                                        <span>{tech.icon}</span>
                                        <span className='text-white'>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='flex gap-4'>
                                <a 
                                    href={selectedProject.github} 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer'
                                >
                                    <FaGithub />
                                    View Code
                                </a>
                                <a 
                                    href={selectedProject.demo} 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer'
                                >
                                    <FaExternalLinkAlt />
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;