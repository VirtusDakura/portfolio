import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ScrollAnimation from './ScrollAnimation';
import { getSkills } from '../utils/sanity';
import ServiceCard from './ServiceCard';

const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const Service = () => {
    const { data: services = [], isLoading: loading } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const data = await getSkills();
            return data || [];
        }
    });

    // Default structured Technical Expertise domains if Sanity data is limited
    const defaultDomains = [
        {
            title: 'Frontend Architecture',
            icon: 'code',
            description: 'Building high-performance, responsive single-page and server-rendered web applications with type-safe modern frameworks.',
            technologies: ['React', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite']
        },
        {
            title: 'Backend & API Systems',
            icon: 'server',
            description: 'Designing scalable RESTful APIs, microservices, secure authentication flows, and real-time backend communication.',
            technologies: ['Node.js', 'Express', 'REST APIs', 'WebSockets', 'Sanity CMS']
        },
        {
            title: 'Databases & Infrastructure',
            icon: 'database',
            description: 'Database schema modeling, query optimization, caching strategies, and automated cloud deployments.',
            technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Vercel', 'Docker']
        },
        {
            title: 'Tooling & System Design',
            icon: 'cloud',
            description: 'Version control workflows, CI/CD pipeline automation, clean code principles, and performance benchmarking.',
            technologies: ['Git & GitHub', 'CI/CD Pipelines', 'System Architecture', 'Unit Testing']
        }
    ];

    const displaySkills = services.length >= 4 ? services : defaultDomains;

    if (loading) {
        return (
            <section id='skills' className='text-white py-16 sm:py-24 border-t border-zinc-800/60'>
                <div className='container mx-auto px-4 text-center'>
                    <div className='animate-pulse max-w-4xl mx-auto'>
                        <div className='h-8 bg-zinc-800 rounded w-48 mb-4'></div>
                        <div className='h-12 bg-zinc-800 rounded w-64 mb-6'></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id='skills' className='text-white py-16 sm:py-24 border-t border-zinc-800/60'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                {/* Section Tag */}
                <ScrollAnimation direction="up">
                    <div className='mb-12'>
                        <span className='text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md'>
                            02 // TECHNICAL EXPERTISE
                        </span>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 text-white tracking-tight'>
                            Engineering Capabilities
                        </h2>
                        <p className='text-zinc-400 text-base sm:text-lg max-w-2xl mt-2'>
                            Specialized technical competencies across modern web architecture, API engineering, and cloud systems.
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Technical Expertise Grid */}
                <ScrollAnimation direction="up" delay={200}>
                    <div className='grid md:grid-cols-2 gap-6 lg:gap-8'>
                        {displaySkills.map((service, index) => (
                            <ServiceCard 
                                key={service._id || index}
                                service={service}
                                index={index}
                            />
                        ))}
                    </div>
                </ScrollAnimation>

                {/* Direct CTA */}
                <ScrollAnimation direction="up" delay={300}>
                    <div className='mt-12 p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6'>
                        <div>
                            <h4 className='text-lg font-bold text-white tracking-tight mb-1'>Need a custom web system or API integrated?</h4>
                            <p className='text-xs sm:text-sm text-zinc-400'>Let's discuss how I can help architect and build your product.</p>
                        </div>
                        <button
                            onClick={scrollToContact}
                            className='bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer text-sm whitespace-nowrap'
                        >
                            Get in Touch
                        </button>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export default Service;