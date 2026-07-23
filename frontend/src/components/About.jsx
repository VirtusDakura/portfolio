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
        : null;

    useEffect(() => {
        if (!aboutImageUrl) return;
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = aboutImageUrl;
    }, [aboutImageUrl]);

    const engineeringPrinciples = [
        {
            icon: <FaCode className="text-indigo-400" />,
            title: 'Clean & Modular Code',
            description: 'Maintainable, type-safe architecture following modern React, Node.js, and API design standards.'
        },
        {
            icon: <FaBolt className="text-indigo-400" />,
            title: 'Performance & Optimization',
            description: 'Optimized render cycles, serverless functions, database queries, and lightweight assets.'
        },
        {
            icon: <FaLayerGroup className="text-indigo-400" />,
            title: 'Full-Stack Execution',
            description: 'End-to-end feature delivery, seamlessly connecting database schema design with client UX.'
        },
        {
            icon: <FaCheckCircle className="text-indigo-400" />,
            title: 'Production Readiness',
            description: 'Robust error handling, environment security, CI/CD integration, and resilient cloud deployments.'
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
            <section id='about' className='text-white py-16 sm:py-20'>
                <div className='container mx-auto px-4 text-center'>
                    <div className='animate-pulse max-w-4xl mx-auto'>
                        <div className='h-8 bg-zinc-800 rounded w-32 mb-4'></div>
                        <div className='h-12 bg-zinc-800 rounded w-64 mb-6'></div>
                        <div className='h-32 bg-zinc-800 rounded w-full'></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id='about' className='text-white py-16 sm:py-24 border-t border-zinc-800/60'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                {/* Section Tag */}
                <ScrollAnimation direction="up" delay={100} className='mb-14'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight'>
                        {title}
                    </h2>
                    <p className='text-zinc-400 text-base sm:text-lg max-w-2xl mt-2'>
                        {subtitle}
                    </p>
                </ScrollAnimation>

                <div className='grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-20'>
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
                                        {!imageLoaded && (
                                            <div className='w-full h-80 sm:h-[28rem] rounded-2xl bg-zinc-900 animate-pulse flex items-center justify-center'>
                                                <div className='text-zinc-600 text-sm'>Loading...</div>
                                            </div>
                                        )}
                                        <img
                                            src={aboutImageUrl}
                                            alt="About Virtus Dakura"
                                            className={`relative w-full h-80 sm:h-[28rem] rounded-2xl object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                            onLoad={() => setImageLoaded(true)}
                                        />
                                        {/* Bottom gradient overlay to hide watermark */}
                                        <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent rounded-b-2xl pointer-events-none'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Right Column: Narrative */}
                    <ScrollAnimation direction="right" delay={300} className='lg:col-span-7'>
                        <h3 className='text-2xl sm:text-3xl font-bold mb-6 text-white tracking-tight leading-snug'>
                            {heading}
                        </h3>

                        <div className='space-y-4 text-zinc-400 text-base leading-relaxed mb-10'>
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

                        {/* Engineering Principles */}
                        <div className='grid sm:grid-cols-2 gap-4'>
                            {engineeringPrinciples.map((principle, index) => (
                                <div
                                    key={index}
                                    className='group/card relative bg-zinc-900/50 backdrop-blur-sm rounded-xl p-5 border border-zinc-800/60 hover:border-indigo-500/30 cursor-pointer transition-all duration-300 overflow-hidden'
                                >
                                    {/* Left accent bar */}
                                    <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-indigo-500 to-violet-500 rounded-l-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300'></div>

                                    {/* Hover glow */}
                                    <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none'></div>

                                    <div className='relative'>
                                        <div className='text-base mb-2 flex items-center gap-2.5 font-semibold text-white'>
                                            <span className='p-1.5 bg-indigo-500/10 rounded-lg'>
                                                {principle.icon}
                                            </span>
                                            <span>{principle.title}</span>
                                        </div>
                                        <p className='text-xs text-zinc-400 leading-relaxed pl-9'>
                                            {principle.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Core Technologies Section */}
                <div className='pt-10 border-t border-zinc-800/60'>
                    <ScrollAnimation direction="up" delay={400}>
                        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-4'>
                            <div>
                                <h4 className='text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2'>
                                    <span>Core Technologies</span>
                                    <span className='text-[11px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium'>
                                        {filteredTech.length} {filteredTech.length === 1 ? 'Tool' : 'Tools'}
                                    </span>
                                </h4>
                                <p className='text-xs sm:text-sm text-zinc-400 mt-0.5'>
                                    Languages, frameworks, databases, and development tooling I build with daily.
                                </p>
                            </div>

                            {/* Category Filter Pills (Compact & Sleek Alignment) */}
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

                        {/* Technology Cards Grid (Uniform Height & Pixel-Perfect Centered Alignment) */}
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-3'>
                            {filteredTech.map((tech, index) => {
                                const brandGlow = getBrandGlow(tech.icon);
                                const sublabel = getTechSublabel(tech.icon, tech.sublabel);
                                const categoryTag = getTechCategory(tech);

                                return (
                                    <div key={index} className='group/tech'>
                                        <div
                                            className={`relative bg-zinc-900/50 backdrop-blur-sm rounded-xl p-3 border border-zinc-800/70 ${brandGlow} cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center h-28 sm:h-30 overflow-hidden`}
                                        >
                                            {/* Top Subtle Category Tag */}
                                            <span className='absolute top-1.5 right-2 text-[9px] font-mono text-zinc-500 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300'>
                                                {categoryTag.split(' ')[0]}
                                            </span>

                                            {/* Icon centered wrapper */}
                                            <div className='relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-2xl sm:text-3xl mb-1.5 transform group-hover/tech:scale-110 transition-transform duration-300 ease-out'>
                                                {getIcon(tech.icon, tech.color || getIconColor(tech.icon))}
                                            </div>

                                            {/* Tech Name */}
                                            <p className='relative text-xs font-semibold text-zinc-200 tracking-tight group-hover/tech:text-white transition-colors duration-300 text-center leading-tight truncate w-full px-1'>
                                                {tech.name}
                                            </p>

                                            {/* Tech Sublabel */}
                                            <p className='relative text-[10px] text-zinc-500 group-hover/tech:text-zinc-400 transition-colors duration-300 font-normal leading-tight text-center truncate w-full px-1 mt-0.5'>
                                                {sublabel}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
};

export default About;