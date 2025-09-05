import React from 'react';

const services =[
    {
        id: 1,
        title: 'Web Development',
        description: 'Building responsive and dynamic websites using modern technologies.'
    },
    {
        id: 2,
        title: 'Mobile App Development',
        description: 'Creating user-friendly mobile applications for iOS and Android platforms.'
    },
    {
        id: 3,
        title: 'UI/UX Design',
        description: 'Designing intuitive and engaging user interfaces for web and mobile applications.'
    },
    {
        id: 4,
        title: 'SEO Optimization',
        description: 'Improving website visibility and ranking on search engines.'
    },
    {
        id: 5,
        title: 'Content Writing',
        description: 'Creating high-quality content for blogs, websites, and social media.'
    },
    {
        id: 6,
        title: 'Digital Marketing',
        description: 'Promoting brands through various digital channels to reach a wider audience.'
    }
]
const Service = () => {
    return (
        <div className='bg-black text-white py-20' id='service'>
            <div className='container mx-auto px-8 md:px-16 lg:px-24'>
                <h2 className='text-4xl font-bold text-center mb-12'>My Services</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {services.map((service) => (
                        <div key={service.id} className='bg-gray-800 px-6 pb-6 rounded-lg hover:shadow-lg transform transition-transform duration-300 hover:scale-105'>
                            <div className='text-right text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-400'>       
                                {service.id}
                                </div>
                                <h3 className='mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                                {service.title}
                                </h3>
                                <p className='mt-2 text-gray-300'>{service.description}</p>
                                <a href='#' className='mt-4 inline-block text-green-400 hover:text-blue-500'>Read More</a>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    )
}
export default Service;