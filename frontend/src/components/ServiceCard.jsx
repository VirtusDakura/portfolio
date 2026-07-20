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

const getSkillIcon = (iconName) => {
    const IconComponent = skillIconMap[iconName?.toLowerCase()] || FaCode;
    return <IconComponent className="text-indigo-400" />;
};

const ServiceCard = ({ service }) => {
    return (
        <div className="group bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 sm:p-8 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between h-full">
            <div>
                {/* Header Icon & Title */}
                <div className='flex items-center gap-3.5 mb-4'>
                    <div className='w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl'>
                        {getSkillIcon(service.icon)}
                    </div>
                    <h3 className='text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors duration-200'>
                        {service.title}
                    </h3>
                </div>

                {/* Description */}
                <p className='text-zinc-400 text-sm leading-relaxed mb-6'>
                    {service.description}
                </p>
            </div>

            {/* Technologies Pills */}
            <div className='pt-4 border-t border-zinc-800/60'>
                <div className='flex flex-wrap gap-2'>
                    {service.technologies?.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className='px-3 py-1 bg-zinc-950/80 text-zinc-300 rounded-lg text-xs font-medium border border-zinc-800'
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
