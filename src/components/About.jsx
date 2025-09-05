import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDatabase, FaCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import AboutImage from '../assets/About.jpg';

const About = () => {
    const skills = [
        { name: 'JavaScript', level: 90, icon: <SiJavascript className="text-yellow-500" /> },
        { name: 'React', level: 85, icon: <FaReact className="text-blue-500" /> },
        { name: 'Node.js', level: 80, icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Python', level: 88, icon: <FaPython className="text-blue-400" /> },
        { name: 'TypeScript', level: 75, icon: <SiTypescript className="text-blue-600" /> },
        { name: 'MongoDB', level: 82, icon: <SiMongodb className="text-green-600" /> }
    ];

    const techStack = [
        { name: 'React', icon: <FaReact className="text-blue-500" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Express', icon: <SiExpress className="text-gray-400" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
        { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-500" /> },
        { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
        { name: 'Python', icon: <FaPython className="text-blue-400" /> }
    ];

    const stats = [
        { number: '2+', label: 'Years Experience' },
        { number: '15+', label: 'Projects Completed' },
        { number: '8+', label: 'Technologies' },
        { number: '100%', label: 'Client Satisfaction' }
    ];

    return (
        <section id='about' className='bg-gray-900 text-white py-20'>
            <div className='container mx-auto px-6 md:px-16 lg:px-24'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                        About <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Me</span>
                    </h2>
                    <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
                        Passionate software engineer with expertise in modern web technologies
                    </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-16 items-center mb-16'>
                    {/* Image and Stats */}
                    <div className='relative'>
                        <div className='relative group'>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                            <img 
                                src={AboutImage} 
                                alt="About Virtus Dakura" 
                                className='relative w-full h-96 rounded-2xl object-cover shadow-2xl'
                            />
                        </div>
                        
                        {/* Stats */}
                        <div className='grid grid-cols-2 gap-4 mt-8'>
                            {stats.map((stat, index) => (
                                <div key={index} className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700'>
                                    <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                                        {stat.number}
                                    </h3>
                                    <p className='text-gray-400 text-sm'>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className='text-2xl font-bold mb-6 text-gray-200'>
                            Crafting Digital Solutions with Modern Technologies
                        </h3>
                        <p className='text-gray-400 mb-6 leading-relaxed'>
                            I'm a passionate software engineer specializing in full-stack web development. 
                            With expertise in modern technologies like React, Node.js, and Python, I create 
                            scalable applications that solve real-world problems.
                        </p>
                        <p className='text-gray-400 mb-8 leading-relaxed'>
                            My approach combines clean code practices with innovative thinking to deliver 
                            exceptional user experiences. I'm always exploring new technologies and 
                            methodologies to stay at the forefront of software development.
                        </p>

                        {/* Skills */}
                        <div className='space-y-4'>
                            {skills.map((skill, index) => (
                                <div key={index} className='group'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-xl'>{skill.icon}</span>
                                            <span className='font-medium text-gray-300'>{skill.name}</span>
                                        </div>
                                        <span className='text-sm text-gray-400'>{skill.level}%</span>
                                    </div>
                                    <div className='w-full bg-gray-800 rounded-full h-2'>
                                        <div 
                                            className='bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-blue-500/25'
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className='text-center'>
                    <h3 className='text-2xl font-bold mb-8 text-gray-200'>Technologies I Work With</h3>
                    <div className='grid grid-cols-4 md:grid-cols-8 gap-6'>
                        {techStack.map((tech, index) => (
                            <div key={index} className='group'>
                                <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-110'>
                                    <div className='text-3xl mb-2 flex justify-center'>
                                        {tech.icon}
                                    </div>
                                    <p className='text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300'>
                                        {tech.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;