import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { getIcon, getIconColor } from '../utils/iconMap';
import { urlFor } from '../utils/sanity';

const ProjectCard = ({ project }) => {
    const getImageUrl = (proj) => {
        if (proj.image) {
            try {
                return urlFor(proj.image).width(800).url();
            } catch (e) {
                return proj.imageUrl || null;
            }
        }
        return proj.imageUrl || null;
    };

    const imageUrl = getImageUrl(project);

    // Normalize technologies array (handles both simple strings and objects)
    const techItems = project.technologies?.map(tech => {
        if (typeof tech === 'string') {
            const normalizedIcon = tech.toLowerCase().replace(/[\s\.\(\)\+\-\#]/g, '');
            return { name: tech, icon: normalizedIcon };
        }
        return tech;
    }) || [];

    return (
        <div className="group/project relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] cursor-pointer">
            {/* Top accent gradient line */}
            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 group-hover/project:opacity-100 transition-opacity duration-300 z-20'></div>

            <div>
                {/* Image Preview Container */}
                <div className='relative overflow-hidden aspect-video bg-zinc-950 border-b border-zinc-800/80 flex items-center justify-center'>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={project.name}
                            className='w-full h-full object-cover group-hover/project:scale-105 transition-transform duration-500 ease-out'
                        />
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950/30 text-center'>
                            <div className='w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl mb-2'>
                                <FaCode />
                            </div>
                            <span className='text-xs font-mono text-zinc-500'>{project.category || 'Engineering Project'}</span>
                        </div>
                    )}

                    <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-70 group-hover/project:opacity-40 transition-opacity duration-300'></div>

                    {/* Featured & Category Badges */}
                    <div className='absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10'>
                        {project.featured ? (
                            <span className='inline-flex items-center bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm'>
                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5'></span>
                                Featured
                            </span>
                        ) : (
                            <span></span>
                        )}

                        {project.category && (
                            <span className='bg-zinc-950/85 text-zinc-300 border border-zinc-800/90 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium backdrop-blur-md'>
                                {project.category}
                            </span>
                        )}
                    </div>
                </div>

                {/* Card Main Content */}
                <div className='p-5 sm:p-6'>
                    <h3 className='text-lg sm:text-xl font-bold text-white tracking-tight group-hover/project:text-indigo-300 transition-colors duration-200 mb-2 leading-snug'>
                        {project.name}
                    </h3>

                    <p className='text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3'>
                        {project.longDescription || project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className='flex flex-wrap gap-1.5 mb-2'>
                        {techItems.map((tech, index) => (
                            <div key={index} className='inline-flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-800/80 px-2.5 py-1 rounded-md'>
                                <span className='text-xs flex justify-center'>
                                    {getIcon(tech.icon, getIconColor(tech.icon))}
                                </span>
                                <span className='text-[11px] text-zinc-300 font-medium'>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Direct Actions Footer */}
            <div className='p-5 sm:p-6 pt-0 border-t border-zinc-800/40 mt-auto flex items-center gap-2.5 sm:gap-3'>
                {project.demo ? (
                    <a
                        href={project.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-xs font-medium transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95'
                    >
                        <FaExternalLinkAlt size={11} />
                        <span>Live Demo</span>
                    </a>
                ) : null}

                {project.github ? (
                    <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-medium transition-all duration-200 active:scale-95'
                        title="View Source Code"
                    >
                        <FaGithub size={13} />
                        <span>Code</span>
                    </a>
                ) : null}
            </div>
        </div>
    );
};

export default ProjectCard;

