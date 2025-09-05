import React from 'react';
import { FaCode, FaMobile, FaServer, FaDatabase, FaCloud, FaRocket } from 'react-icons/fa';
import { SiReact, SiNodedotjs } from 'react-icons/si';

const services = [
    {
        id: 1,
        title: 'Frontend Development',
        description: 'Building responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.',
        icon: <SiReact className="text-blue-500" />,
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 2,
        title: 'Backend Development',
        description: 'Creating robust server-side applications with Node.js, Express, and RESTful APIs.',
        icon: <SiNodedotjs className="text-green-500" />,
        technologies: ['Node.js', 'Express', 'Python', 'REST APIs'],
        color: 'from-green-500 to-emerald-500'
    },
    {
        id: 3,
        title: 'Database Design',
        description: 'Designing efficient database schemas and optimizing queries for better performance.',
        icon: <FaDatabase className="text-orange-500" />,
        technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma'],
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 4,
        title: 'Full-Stack Applications',
        description: 'End-to-end application development from concept to deployment.',
        icon: <FaCode className="text-purple-500" />,
        technologies: ['MERN Stack', 'Next.js', 'Prisma', 'Vercel'],
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 5,
        title: 'Mobile Development',
        description: 'Cross-platform mobile applications using React Native and modern mobile technologies.',
        icon: <FaMobile className="text-indigo-500" />,
        technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
        color: 'from-indigo-500 to-blue-500'
    },
    {
        id: 6,
        title: 'DevOps & Deployment',
        description: 'Setting up CI/CD pipelines and deploying applications to cloud platforms.',
        icon: <FaCloud className="text-cyan-500" />,
        technologies: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'],
        color: 'from-cyan-500 to-teal-500'
    }
];

const Service = () => {
    return (
        <section id='skills' className='bg-black text-white py-20'>
            <div className='container mx-auto px-6 md:px-16 lg:px-24'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                        My <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Skills</span>
                    </h2>
                    <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
                        Specialized expertise in modern software development technologies and practices
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {services.map((service) => (
                        <div 
                            key={service.id}
                            className='group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden'
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                            
                            {/* Content */}
                            <div className='relative z-10'>
                                {/* Icon */}
                                <div className='text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className='text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300'>
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className='text-gray-400 mb-6 leading-relaxed'>
                                    {service.description}
                                </p>

                                {/* Technologies */}
                                <div className='flex flex-wrap gap-2 mb-6'>
                                    {service.technologies.map((tech, index) => (
                                        <span 
                                            key={index}
                                            className='px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 group-hover:border-gray-600 transition-colors duration-300'
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Learn More Link */}
                                <div className='flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer'>
                                    <span className='text-sm font-medium'>Learn More</span>
                                    <FaRocket className='ml-2 transform group-hover:translate-x-1 transition-transform duration-300' />
                                </div>
                            </div>

                            {/* Number Badge */}
                            <div className='absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                                {service.id}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className='text-center mt-16'>
                    <p className='text-gray-400 mb-6'>
                        Interested in working together? Let's discuss your project.
                    </p>
                    <button 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300'
                    >
                        Start a Project
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Service;