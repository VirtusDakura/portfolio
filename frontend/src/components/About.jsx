import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCode, FaLayerGroup, FaBolt, FaCheckCircle } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { getAbout, urlFor } from '../utils/sanity';
import { getIcon, getIconColor } from '../utils/iconMap';

const About = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { data: aboutData, isLoading: loading } = useQuery({
        queryKey: ['about'],
        queryFn: getAbout
    });

    const title = aboutData?.title || 'About Me';
    const subtitle = aboutData?.subtitle || 'Engineering background, technical principles, and core competencies.';
    const heading = aboutData?.heading || 'Building modern, reliable software solutions.';
    const paragraphs = aboutData?.paragraphs || [];
    const techStack = aboutData?.techStack || [];

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
                    <span className='text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md'>
                        01 // ABOUT & ENGINEERING FOCUS
                    </span>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 text-white tracking-tight'>
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
                                    className='group/card relative bg-zinc-900/50 backdrop-blur-sm rounded-xl p-5 border border-zinc-800/60 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden'
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

                {/* Technologies Grid */}
                <div className='pt-10 border-t border-zinc-800/60'>
                    <ScrollAnimation direction="up" delay={400}>
                        <div className='mb-8'>
                            <h4 className='text-xl sm:text-2xl font-bold text-white tracking-tight'>
                                Core Technologies
                            </h4>
                            <p className='text-sm text-zinc-400 mt-1'>Languages, frameworks, databases, and development tooling I build with daily.</p>
                        </div>

                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3'>
                            {techStack.map((tech, index) => (
                                <div key={index} className='group/tech'>
                                    <div className='relative bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-800/60 hover:border-indigo-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center h-full overflow-hidden'>
                                        {/* Hover shine */}
                                        <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 pointer-events-none'></div>

                                        <div className='relative text-3xl mb-2.5 flex justify-center transform group-hover/tech:scale-110 transition-transform duration-300'>
                                            {getIcon(tech.icon, tech.color || getIconColor(tech.icon))}
                                        </div>
                                        <p className='relative text-xs text-zinc-400 group-hover/tech:text-zinc-200 transition-colors duration-300 font-medium tracking-tight'>
                                            {tech.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
};

export default About;