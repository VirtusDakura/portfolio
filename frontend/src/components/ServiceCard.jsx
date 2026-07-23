import React from 'react';
import { FaCode, FaMobile, FaServer, FaDatabase, FaCloud, FaRocket, FaCheck } from 'react-icons/fa';
import { getIcon, getIconColor } from '../utils/iconMap';

const mainIconMap = {
    'code': FaCode,
    'mobile': FaMobile,
    'server': FaServer,
    'database': FaDatabase,
    'cloud': FaCloud,
    'rocket': FaRocket,
};

const getMainIcon = (iconName) => {
    const IconComponent = mainIconMap[iconName?.toLowerCase()] || FaCode;
    return <IconComponent className="text-indigo-400" />;
};

const ServiceCard = ({ service }) => {
    // Normalize technologies array (handles both simple strings and objects)
    const techItems = service.technologies?.map(tech => {
        if (typeof tech === 'string') {
            const normalizedIcon = tech.toLowerCase().replace(/[\s\.\(\)\+\-\#]/g, '');
            return { name: tech, icon: normalizedIcon };
        }
        return tech;
    }) || [];

    return (
        <div className="group/card relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
            {/* Top accent gradient bar */}
            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300'></div>

            <div>
                {/* Header Icon & Title */}
                <div className='flex items-center gap-3.5 mb-4'>
                    <div className='w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl shrink-0 group-hover/card:bg-indigo-500/20 group-hover/card:border-indigo-500/40 transition-colors duration-300'>
                        {getMainIcon(service.icon)}
                    </div>
                    <h3 className='text-xl sm:text-2xl font-bold text-white tracking-tight group-hover/card:text-indigo-300 transition-colors duration-200 leading-snug'>
                        {service.title}
                    </h3>
                </div>

                {/* Description */}
                <p className='text-zinc-400 text-sm sm:text-base leading-relaxed mb-5'>
                    {service.description}
                </p>

                {/* Engineering Highlights / Deliverables */}
                {service.highlights && service.highlights.length > 0 && (
                    <div className='space-y-2 mb-6 bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/60'>
                        {service.highlights.map((highlight, idx) => (
                            <div key={idx} className='flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300'>
                                <span className='p-1 bg-indigo-500/10 rounded text-indigo-400 mt-0.5 shrink-0'>
                                    <FaCheck className='text-[10px]' />
                                </span>
                                <span className='leading-normal'>{highlight}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Technologies Badges with Icons */}
            <div className='pt-4 border-t border-zinc-800/60'>
                <div className='flex flex-wrap gap-2'>
                    {techItems.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/80 text-zinc-300 rounded-lg text-xs font-medium border border-zinc-800/80 hover:border-zinc-700 hover:text-white transition-colors duration-200'
                        >
                            <span className='text-sm flex justify-center'>
                                {getIcon(tech.icon, getIconColor(tech.icon))}
                            </span>
                            <span>{tech.name}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;

