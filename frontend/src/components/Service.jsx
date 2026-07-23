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
            highlights: [
                'Type-safe React & Next.js client architectures',
                'Optimized rendering, Core Web Vitals & dynamic caching',
                'Responsive utility-first styling with Tailwind CSS'
            ],
            technologies: [
                { name: 'React', icon: 'react' },
                { name: 'Next.js', icon: 'nextjs' },
                { name: 'TypeScript', icon: 'typescript' },
                { name: 'Tailwind CSS', icon: 'tailwind' },
                { name: 'Vite', icon: 'vite' }
            ]
        },
        {
            title: 'Backend & API Systems',
            icon: 'server',
            description: 'Designing scalable RESTful APIs, microservices, secure authentication flows, and real-time backend communication.',
            highlights: [
                'Robust REST & GraphQL API endpoint design',
                'Secure JWT/OAuth authentication & middleware',
                'Server-side logic with Node.js, Express & Python'
            ],
            technologies: [
                { name: 'Node.js', icon: 'nodejs' },
                { name: 'Express', icon: 'express' },
                { name: 'Python', icon: 'python' },
                { name: 'REST APIs', icon: 'server' }
            ]
        },
        {
            title: 'Databases & Infrastructure',
            icon: 'database',
            description: 'Database schema modeling, query optimization, caching strategies, and automated cloud deployments.',
            highlights: [
                'Relational (PostgreSQL) & NoSQL (MongoDB) schemas',
                'Type-safe database ORMs (Prisma) & Redis caching',
                'Serverless functions & edge cloud deployments'
            ],
            technologies: [
                { name: 'PostgreSQL', icon: 'postgresql' },
                { name: 'MongoDB', icon: 'mongodb' },
                { name: 'Redis', icon: 'redis' },
                { name: 'Prisma', icon: 'prisma' },
                { name: 'Docker', icon: 'docker' }
            ]
        },
        {
            title: 'Tooling & System Design',
            icon: 'cloud',
            description: 'Version control workflows, CI/CD pipeline automation, clean code principles, and performance benchmarking.',
            highlights: [
                'Modular component systems & clean code standards',
                'Git version control & automated GitHub Actions',
                'Cloud hosting on Vercel, AWS & modern BaaS'
            ],
            technologies: [
                { name: 'AWS', icon: 'aws' },
                { name: 'Vercel', icon: 'vercel' },
                { name: 'Git', icon: 'git' },
                { name: 'Figma', icon: 'figma' }
            ]
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

                {/* Direct CTA Banner */}
                <ScrollAnimation direction="up" delay={300}>
                    <div className='relative mt-12 p-6 sm:p-8 bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-900/90 border border-zinc-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden shadow-xl group'>
                        {/* Ambient glow */}
                        <div className='absolute -inset-1 bg-indigo-500/5 rounded-2xl blur-xl group-hover:bg-indigo-500/10 transition-colors duration-500 pointer-events-none'></div>

                        <div className='relative z-10'>
                            <h4 className='text-lg sm:text-xl font-bold text-white tracking-tight mb-1'>
                                Need a custom web application or API integrated?
                            </h4>
                            <p className='text-xs sm:text-sm text-zinc-400'>
                                Let's discuss your project requirements and technical architecture.
                            </p>
                        </div>
                        <button
                            onClick={scrollToContact}
                            className='relative z-10 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-200 cursor-pointer text-sm whitespace-nowrap active:scale-95'
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