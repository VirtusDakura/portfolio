import React from 'react';
import ProjectImage1 from '../assets/Project1.png';
import ProjectImage2 from '../assets/Project2.png';
import ProjectImage3 from '../assets/Project3.png';

const projects = [
    {
        id: 1,
        name: 'Project One',
        technologies: 'MERN Stack',
        image: ProjectImage1,
        github: 'www.github.com/project1',
    },
    {
        id: 2,
        name: 'Project Two',
        technologies: 'MERN Stack',
        image: ProjectImage2,
        github: 'www.github.com/project1',
    },
    {
        id: 3,
        name: 'Project Three',
        technologies: 'MERN Stack',
        image: ProjectImage3,
        github: 'www.github.com/project1',
    }
];
const Projects = () => {
    return (
        <div className='bg-black text-white py-20' id='projects'>
            <div className='container mx-auto px-8 md:px-16 lg:px-24'>
                <h2 className='text-4xl font-bold text-center mb-12'>My Projects</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {projects.map((project) => (
                        <div key={project.id} className='bg-gray-800 p-6 rounded-lg hover:shadow-lg transform transition-transform duration-300 hover:scale-105'>
                                <img src={project.image} alt={project.name} className='rounded-lg mb-4 w-full h-48 object cover'/>
                            <h3 className='text-2xl font-bold mb-2'>
                                {project.name}
                            </h3>
                            <p className='text-gray-400 mb-4'>{project.technologies}</p>
                            <a href={project.github} className='inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full' target='_blank' rel='noopener noreferrer'>GitHub</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Projects;