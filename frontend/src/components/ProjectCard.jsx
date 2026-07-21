import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { getIcon, getIconColor } from '../utils/iconMap';
import { urlFor } from '../utils/sanity';

const ProjectCard = ({ project }) => {
    const getImageUrl = (proj) => {
        if (proj.image) {
            return urlFor(proj.image).width(800).url();
        }
        return null;
    };

    return (
        <div className="group bg-zinc-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between h-full shadow-lg">
            <div>
                {/* Image Preview Container */}
                <div className='relative overflow-hidden aspect-video bg-zinc-950 border-b border-zinc-800/80'>
                    <img
                        src={getImageUrl(project)}
                        alt={project.name}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60'></div>

                    {/* Featured & Category Badges */}
                    <div className='absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10'>
                        {project.featured ? (
                            <span className='bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md'>
                                Featured
                            </span>
                        ) : <span></span>}

                        <span className='bg-zinc-950/80 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded-md text-xs font-mono font-medium backdrop-blur-md'>
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Card Main Body */}
                <div className='p-6'>
                    <h3 className='text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors duration-200 mb-2.5'>
                        {project.name}
                    </h3>

                    <p className='text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-3'>
                        {project.longDescription || project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className='flex flex-wrap gap-1.5 mb-6'>
                        {project.technologies?.map((tech, index) => (
                            <div key={index} className='flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 rounded-md'>
                                <span className='text-xs'>
                                    {getIcon(tech.icon, tech.color || getIconColor(tech.icon))}
                                </span>
                                <span className='text-xs text-zinc-300 font-medium'>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Direct Actions Footer */}
            <div className='p-6 pt-0 border-t border-zinc-800/40 mt-auto flex items-center gap-3'>
                {project.demo && (
                    <a
                        href={project.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 rounded-lg text-xs font-medium transition-colors duration-200 shadow-sm'
                    >
                        <FaExternalLinkAlt size={12} />
                        Live Demo
                    </a>
                )}

                {project.github && (
                    <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center gap-2 bg-zinc-800/80 border border-zinc-700/80 hover:bg-zinc-800 text-zinc-200 hover:text-white py-2.5 px-4 rounded-lg text-xs font-medium transition-colors duration-200'
                        title="View Source Code"
                    >
                        <FaGithub size={14} />
                        Code
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
