import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaGithub } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getProjects } from '../utils/sanity';
import ProjectCard from './ProjectCard';

const Projects = () => {
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
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className='bg-zinc-900 border border-zinc-800 rounded-2xl h-96'></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || projects.length === 0) {
        return (
            <section id='projects' className='text-white py-16 sm:py-24 border-t border-zinc-800/60'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md'>
                        03 // FEATURED WORK
                    </span>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-4 text-white tracking-tight'>
                        Featured Work
                    </h2>
                    <p className='text-zinc-400 text-lg'>
                        {error || 'No projects loaded yet.'}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id='projects' className='text-white py-16 sm:py-24 border-t border-zinc-800/60'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                {/* Section Header */}
                <ScrollAnimation direction="up">
                    <div className='mb-12'>
                        <span className='text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md'>
                            03 // FEATURED WORK
                        </span>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 text-white tracking-tight'>
                            Selected Engineering Projects
                        </h2>
                        <p className='text-zinc-400 text-base sm:text-lg max-w-2xl mt-2'>
                            Production applications, full-stack architectures, and open-source software built for scale and performance.
                        </p>

                        {/* Filter Categories */}
                        <div className='flex flex-wrap gap-2 mt-6'>
                            {availableCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer text-xs font-medium ${filter === category
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Projects Grid */}
                <ScrollAnimation direction="up" delay={200}>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                        {filteredProjects.map((project) => (
                            <ProjectCard 
                                key={project._id}
                                project={project}
                            />
                        ))}
                    </div>
                </ScrollAnimation>

                {/* GitHub CTA */}
                <ScrollAnimation direction="up" delay={300}>
                    <div className='text-center mt-12 sm:mt-16 pt-8 border-t border-zinc-800/60'>
                        <p className='text-zinc-400 text-sm mb-4'>Want to explore more of my code repositories and experiments?</p>
                        <a
                            href='https://github.com/VirtusDakura'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer text-sm font-medium'
                        >
                            <FaGithub size={18} />
                            View GitHub Organization
                        </a>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export default Projects;