import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCode, FaLayerGroup, FaBolt, FaCheckCircle } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getAbout, urlFor } from '../utils/sanity';
import { getIcon, getIconColor, getTechSublabel, getBrandGlow, getTechCategory, DEFAULT_TECH_STACK } from '../utils/iconMap';

const About = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    const { data: aboutData, isLoading: loading } = useQuery({
        queryKey: ['about'],
        queryFn: getAbout
    });

    const title = aboutData?.title || 'About Me';
    const subtitle = aboutData?.subtitle || 'Engineering background, technical principles, and core competencies.';
    const heading = aboutData?.heading || 'Building modern, reliable software solutions.';
    const paragraphs = aboutData?.paragraphs || [];
    
    // Use fetched Sanity tech stack if non-empty, otherwise fallback to rich default stack
    const fetchedTechStack = aboutData?.techStack && aboutData.techStack.length > 0 ? aboutData.techStack : null;
    const allTechItems = fetchedTechStack || DEFAULT_TECH_STACK;

    const aboutImageUrl = aboutData?.aboutImage
        ? urlFor(aboutData.aboutImage).width(800).url()
        : '/Profile.png';

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageLoaded(true);
        img.src = aboutImageUrl;
    }, [aboutImageUrl]);

    const engineeringPrinciples = [
        {
            icon: <FaCode className="text-indigo-400" />,
            title: 'Clean & Modular Code',
            description: 'Type-safe, maintainable React, Node.js & REST API architecture.'
        },
        {
            icon: <FaBolt className="text-indigo-400" />,
            title: 'Performance & Speed',
            description: 'Optimized render cycles, serverless functions & fast caching.'
        },
        {
            icon: <FaLayerGroup className="text-indigo-400" />,
            title: 'Full-Stack Execution',
            description: 'End-to-end features connecting database schemas to responsive UI.'
        },
        {
            icon: <FaCheckCircle className="text-indigo-400" />,
            title: 'Production Readiness',
            description: 'Resilient error handling, environment security & cloud deployments.'
        }
    ];

    // Categories list for filter tabs
    const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Tools'];

    // Filter items based on active tab using fallback category detection
    const filteredTech = activeCategory === 'All'
        ? allTechItems
        : allTechItems.filter(item => {
            const itemCat = getTechCategory(item);
            return itemCat.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]);
        });


    if (loading) {
        return (
            <section id='about' className='text-white py-12 sm:py-20'>
                <div className='container mx-auto px-4 text-center'>
                    <div className='animate-pulse max-w-4xl mx-auto'>
                        <div className='h-8 bg-zinc-800 rounded w-32 mb-4 mx-auto'></div>
                        <div className='h-12 bg-zinc-800 rounded w-64 mb-6 mx-auto'></div>
                        <div className='h-32 bg-zinc-800 rounded w-full'></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id='about' className='text-white py-10 sm:py-16 border-t border-zinc-800/60'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                {/* Section Header */}
                <ScrollAnimation direction="up" delay={100} className='mb-8 sm:mb-10'>
                    <h2 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight'>
                        {title}
                    </h2>
                    <p className='text-zinc-400 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed'>
                        {subtitle}
                    </p>
                </ScrollAnimation>

                {/* About Content Grid */}
                <div className='grid lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-12 sm:mb-16'>
                    {/* Left Column: Rotated Image */}
                    <ScrollAnimation direction="left" delay={200} className='lg:col-span-5 flex justify-center'>
                        <div className='relative group'>
                            {/* Ambient glow behind image */}
                            <div className='absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500'></div>
                            <div className='absolute -inset-4 bg-violet-500/5 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 translate-x-4 translate-y-4'></div>

                            {/* Image frame with rotation */}
                            <div
                                className='relative -rotate-3 group-hover:-rotate-1 transition-transform duration-500 ease-out'
                            >
                                {/* Gradient border wrapper */}
                                <div className='p-[2px] rounded-2xl bg-gradient-to-br from-indigo-500/50 via-zinc-700/30 to-violet-500/40 shadow-[0_0_40px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] transition-shadow duration-500 overflow-hidden'>
                                    <div className='relative'>
                                        <img
                                            src={aboutImageUrl}
                                            alt="Virtus Dakura - Software Engineer"
                                            className={`relative w-full h-80 sm:h-[28rem] rounded-2xl object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-90'}`}
                                            onLoad={() => setImageLoaded(true)}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/Profile.png';
                                                setImageLoaded(true);
                                            }}
                                        />
                                        {/* Bottom gradient overlay to hide watermark */}
                                        <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent rounded-b-2xl pointer-events-none'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Right Column: Narrative & Principles */}
                    <ScrollAnimation direction="right" delay={300} className='lg:col-span-7 flex flex-col justify-between'>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white tracking-tight leading-snug'>
                                {heading}
                            </h3>

                            <div className='space-y-3 text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8'>
                                {paragraphs.length > 0 ? (
                                    paragraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))
                                ) : (
                                    <p>
                                        I am a software engineer focused on building clean, robust, and scalable applications. With experience across frontend systems, RESTful APIs, and database engineering, I turn complex problems into reliable code.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Engineering Principles Grid (2 Rows x 2 Columns) */}
                        <div className='grid grid-cols-2 gap-2.5 sm:gap-4'>
                            {engineeringPrinciples.map((principle, index) => (
                                <div
                                    key={index}
                                    className='group/card relative bg-zinc-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-zinc-800/80 hover:border-indigo-500/40 transition-all duration-200 overflow-hidden shadow-sm flex flex-col justify-between'
                                >
                                    {/* Left accent bar */}
                                    <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-indigo-500 to-violet-500 rounded-l-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-200'></div>

                                    <div className='relative flex flex-col h-full justify-between'>
                                        <div>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <div className='w-7 h-7 sm:w-8 sm:h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 text-xs sm:text-sm shrink-0'>
                                                    {principle.icon}
                                                </div>
                                                <h4 className='text-xs sm:text-sm font-bold text-white tracking-tight leading-snug group-hover/card:text-indigo-300 transition-colors duration-200'>
                                                    {principle.title}
                                                </h4>
                                            </div>
                                            <p className='text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-normal'>
                                                {principle.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Core Technologies Section */}
                <div className='pt-8 border-t border-zinc-800/60'>
                    <ScrollAnimation direction="up" delay={400}>
                        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3 sm:gap-4'>
                            <div>
                                <h4 className='text-lg sm:text-xl font-bold text-white tracking-tight'>
                                    Core Technologies
                                </h4>
                                <p className='text-xs sm:text-sm text-zinc-400 mt-0.5'>
                                    Languages, frameworks, databases, and development tooling I build with daily.
                                </p>
                            </div>

                            {/* Category Filter Pills (Clean Responsive Alignment) */}
                            <div className='inline-flex flex-wrap items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800/80 backdrop-blur-md self-start sm:self-auto'>
                                {categories.map(cat => {
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`text-xs font-medium px-2.5 sm:px-3 py-1 h-7 rounded-md transition-all duration-200 cursor-pointer select-none active:scale-95 touch-manipulation flex items-center justify-center leading-none ${
                                                isActive
                                                    ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Technology Cards Grid (2-row horizontal snap carousel on mobile, 7-column desktop layout) */}
                        <div className='grid grid-rows-2 grid-flow-col auto-cols-[110px] sm:grid-rows-none sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0'>
                            {filteredTech.map((tech, index) => {
                                const brandGlow = getBrandGlow(tech.icon);
                                const sublabel = getTechSublabel(tech.icon, tech.sublabel);

                                return (
                                    <div key={index} className='snap-center group/tech'>
                                        <div
                                            className={`relative bg-zinc-900/60 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-zinc-800/80 ${brandGlow} cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center h-22 sm:h-28 overflow-hidden shadow-sm`}
                                        >
                                            {/* Icon centered wrapper */}
                                            <div className='relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-lg sm:text-2xl mb-1 sm:mb-1.5 group-hover/tech:scale-110 transition-transform duration-200 ease-out'>
                                                {getIcon(tech.icon, tech.color || getIconColor(tech.icon))}
                                            </div>

                                            {/* Tech Name */}
                                            <p className='relative text-[11px] sm:text-xs font-semibold text-zinc-200 tracking-tight group-hover/tech:text-white transition-colors duration-200 text-center leading-tight truncate w-full px-0.5'>
                                                {tech.name}
                                            </p>

                                            {/* Tech Sublabel */}
                                            <p className='relative text-[9px] sm:text-[10px] text-zinc-500 group-hover/tech:text-zinc-400 transition-colors duration-200 font-normal leading-tight text-center truncate w-full px-0.5 mt-0.5'>
                                                {sublabel}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile Horizontal Swipe Arrow Hint */}
                        <div className='flex sm:hidden items-center justify-end mt-1.5 text-indigo-400 text-sm font-bold'>
                            <span className='animate-pulse'>→</span>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
};

export default About;