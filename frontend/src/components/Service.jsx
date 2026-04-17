import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ScrollAnimation from './ScrollAnimation';
import { getSkills } from '../utils/sanity';
import ServiceCard from './ServiceCard';

const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

// Safelist gradient colors used by Sanity CMS so Tailwind doesn't purge them
// eslint-disable-next-line no-unused-vars
const gradientSafelist = [
    'from-blue-500', 'to-cyan-500',
    'from-purple-500', 'to-pink-500',
    'from-green-500', 'to-emerald-500',
    'from-orange-500', 'to-yellow-500',
    'from-cyan-500', 'to-blue-500',
    'from-pink-500', 'to-purple-500'
];

const Service = () => {
    const { data: services = [], isLoading: loading, isError } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const data = await getSkills();
            return data || [];
        }
    });

    const error = isError ? 'Failed to load skills' : null;



    if (loading) {
        return (
            <section id='skills' className='text-white py-12 sm:py-16 lg:py-20'>
                <div className='container mx-auto px-4 text-center'>
                    <div className='animate-pulse'>
                        <div className='h-12 bg-gray-700 rounded w-48 mx-auto mb-4'></div>
                        <div className='h-6 bg-gray-700 rounded w-96 mx-auto mb-8'></div>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className='bg-gray-800 rounded-2xl h-64'></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || services.length === 0) {
        return (
            <section id='skills' className='text-white py-12 sm:py-16 lg:py-20'>
                <div className='container mx-auto px-4 text-center'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                        My <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Skills</span>
                    </h2>
                    <p className='text-gray-400 text-lg'>
                        {error || 'No skills available yet. Check back soon!'}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id='skills' className='text-white py-12 sm:py-16 lg:py-20'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32'>
                <ScrollAnimation direction="up">
                    <div className='text-center mb-12 sm:mb-16'>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                            My <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Skills</span>
                        </h2>
                        <p className='text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0'>
                            Specialized expertise in modern software development technologies and practices
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Mobile/Tablet Horizontal Scroll */}
                <ScrollAnimation direction="left">
                    <div className='lg:hidden'>
                        <div className='relative'>
                            {/* Enhanced scroll indicators with bouncing animation */}
                            <div className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none'>
                                <div className='text-blue-400 text-3xl animate-bounce font-bold'>‹</div>
                            </div>

                            {/* Right scroll indicator arrow */}
                            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none'>
                                <div className='text-purple-400 text-3xl animate-bounce font-bold'>›</div>
                            </div>

                            <div className='overflow-x-auto pb-4 scroll-smooth scrollbar-hide'>
                                <div className='flex space-x-6 sm:space-x-8 min-w-max'>
                                    {services.map((service, index) => (
                                        <ServiceCard 
                                            key={service._id || index}
                                            service={service}
                                            index={index}
                                            isMobile={true}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Desktop Grid */}
                <ScrollAnimation direction="right">
                    <div className='hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8'>
                        {services.map((service, index) => (
                            <ServiceCard 
                                key={service._id || index}
                                service={service}
                                index={index}
                                isMobile={false}
                            />
                        ))}
                    </div>
                </ScrollAnimation>

                {/* Call to Action */}
                <ScrollAnimation direction="up">
                    <div className='text-center mt-12 sm:mt-16'>
                        <p className='text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base px-4 sm:px-0'>
                            Interested in working together? Let's discuss your project.
                        </p>
                        <button
                            onClick={scrollToContact}
                            className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer text-sm sm:text-base'
                        >
                            Start a Project
                        </button>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export default Service;