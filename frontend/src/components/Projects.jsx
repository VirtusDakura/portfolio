import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaGithub } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getProjects } from '../utils/sanity';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile'];

    const { data: fetchedProjects = [], isLoading: loading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const data = await getProjects();
            return data || [];
        }
    });

    // Default structured Engineering Projects fallback if Sanity data is empty
    const defaultProjects = [
        {
            _id: 'proj-1',
            name: 'Full-Stack Analytics & SaaS Platform',
            category: 'Full-Stack',
            featured: true,
            description: 'Enterprise data dashboard featuring real-time metrics, user authentication, role-based access control, and dynamic chart visualizations.',
            technologies: [
                { name: 'React', icon: 'react' },
                { name: 'Node.js', icon: 'nodejs' },
                { name: 'PostgreSQL', icon: 'postgresql' },
                { name: 'Tailwind CSS', icon: 'tailwind' },
                { name: 'TypeScript', icon: 'typescript' }
            ],
            github: 'https://github.com/VirtusDakura',
            demo: 'https://github.com/VirtusDakura'
        },
        {
            _id: 'proj-2',
            name: 'RESTful Microservices & API Engine',
            category: 'Backend',
            featured: true,
            description: 'High-throughput backend API service engineered for fast query resolution, Redis caching, JWT token management, and sub-100ms response targets.',
            technologies: [
                { name: 'Node.js', icon: 'nodejs' },
                { name: 'Express', icon: 'express' },
                { name: 'Redis', icon: 'redis' },
                { name: 'Prisma', icon: 'prisma' },
                { name: 'Docker', icon: 'docker' }
            ],
            github: 'https://github.com/VirtusDakura',
            demo: 'https://github.com/VirtusDakura'
        },
        {
            _id: 'proj-3',
            name: 'Next.js Web Portal & Content Engine',
            category: 'Frontend',
            featured: false,
            description: 'Modern mobile-first web portal built with Next.js App Router, Sanity CMS dynamic content management, and responsive server-side rendering.',
            technologies: [
                { name: 'Next.js', icon: 'nextjs' },
                { name: 'React', icon: 'react' },
                { name: 'Tailwind CSS', icon: 'tailwind' },
                { name: 'Vite', icon: 'vite' },
                { name: 'Redux', icon: 'redux' }
            ],
            github: 'https://github.com/VirtusDakura',
            demo: 'https://github.com/VirtusDakura'
        }
    ];

    const projects = fetchedProjects.length > 0 ? fetchedProjects : defaultProjects;

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    const availableCategories = categories.filter(cat =>
        cat === 'All' || projects.some(p => p.category === cat)
    );

    if (loading) {
        return (
            <section id='projects' className='text-white py-16 sm:py-24 border-t border-zinc-800/60'>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                    <div className='animate-pulse'>
                        <div className='h-8 bg-zinc-800 rounded w-48 mb-4'></div>
                        <div className='h-12 bg-zinc-800 rounded w-64 mb-8'></div>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className='bg-zinc-900 border border-zinc-800 rounded-2xl h-96'></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id='projects' className='text-white py-10 sm:py-16 border-t border-zinc-800/60'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                {/* Section Header */}
                <ScrollAnimation direction="up">
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4'>
                        <div>
                            <h2 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight'>
                                Selected Engineering Projects
                            </h2>
                            <p className='text-zinc-400 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed'>
                                Production applications, full-stack architectures, and open-source software built for scale and performance.
                            </p>
                        </div>

                        {/* Filter Category Pills (Compact & Sleek Alignment) */}
                        <div className='inline-flex flex-wrap items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800/80 backdrop-blur-md self-start sm:self-auto'>
                            {availableCategories.map((category) => {
                                const isActive = filter === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setFilter(category)}
                                        className={`text-xs font-medium px-3 py-1 h-7 rounded-md transition-all duration-200 cursor-pointer select-none active:scale-95 touch-manipulation flex items-center justify-center leading-none ${
                                            isActive
                                                ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Projects Grid / Horizontal Carousel on Mobile */}
                <ScrollAnimation direction="up" delay={200}>
                    <div className='flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 md:pb-0'>
                        {filteredProjects.map((project) => (
                            <div 
                                key={project._id}
                                className='w-[86vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink-1'
                            >
                                <ProjectCard 
                                    project={project}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Horizontal Swipe Arrow Hint */}
                    <div className='flex md:hidden items-center justify-end mt-1.5 text-indigo-400 text-sm font-bold'>
                        <span className='animate-pulse'>→</span>
                    </div>
                </ScrollAnimation>

                {/* GitHub CTA Banner */}
                <ScrollAnimation direction="up" delay={300}>
                    <div className='text-center mt-12 sm:mt-16 pt-8 border-t border-zinc-800/60 flex flex-col items-center justify-center'>
                        <p className='text-zinc-400 text-xs sm:text-sm mb-4 max-w-md'>
                            Want to explore more of my code repositories, backend APIs, and engineering experiments?
                        </p>
                        <a
                            href='https://github.com/VirtusDakura'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700 text-white px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer text-xs sm:text-sm font-medium shadow-md hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] active:scale-95'
                        >
                            <FaGithub size={18} className='text-indigo-400' />
                            <span>View GitHub Organization</span>
                        </a>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export default Projects;