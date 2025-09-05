import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const quickLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    const socialLinks = [
        {
            icon: <FaLinkedin />,
            url: 'https://linkedin.com/in/virtus-dakura',
            label: 'LinkedIn',
            color: 'hover:text-blue-400'
        },
        {
            icon: <FaGithub />,
            url: 'https://github.com/VirtusDakura',
            label: 'GitHub',
            color: 'hover:text-gray-300'
        },
        {
            icon: <FaTwitter />,
            url: 'https://twitter.com/virtusdakura',
            label: 'Twitter',
            color: 'hover:text-blue-500'
        },
        {
            icon: <FaEnvelope />,
            url: 'mailto:dakuravirtus@gmail.com',
            label: 'Email',
            color: 'hover:text-green-400'
        }
    ];

    return (
        <footer className='bg-gray-900 text-white relative'>
            {/* Main Footer Content */}
            <div className='container mx-auto px-6 md:px-16 lg:px-24 py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Brand Section */}
                    <div className='lg:col-span-2'>
                        <div className='mb-6'>
                            <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4'>
                                &lt;VirtusDev/&gt;
                            </h3>
                            <p className='text-gray-400 leading-relaxed max-w-md'>
                                Passionate software engineer crafting innovative digital solutions. 
                                Specializing in full-stack development with modern technologies and clean code practices.
                            </p>
                        </div>
                        
                        {/* Newsletter Subscription */}
                        <div className='mb-6'>
                            <h4 className='text-lg font-semibold mb-3 text-gray-200'>Stay Updated</h4>
                            <p className='text-gray-400 text-sm mb-4'>
                                Get notified about new projects and tech insights.
                            </p>
                            <form onSubmit={handleSubscribe} className='flex'>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email'
                                    className='flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                                <button
                                    type='submit'
                                    className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-r-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'
                                >
                                    Subscribe
                                </button>
                            </form>
                            {isSubscribed && (
                                <p className='text-green-400 text-sm mt-2'>Thank you for subscribing!</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-lg font-semibold mb-6 text-gray-200'>Quick Links</h4>
                        <ul className='space-y-3'>
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(link.href.substring(1))?.scrollIntoView({
                                                behavior: 'smooth'
                                            });
                                        }}
                                        className='text-gray-400 hover:text-white transition-colors duration-300 flex items-center group'
                                    >
                                        <span className='w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mr-0 group-hover:mr-2 transition-all duration-300'></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className='text-lg font-semibold mb-6 text-gray-200'>Connect</h4>
                        <div className='space-y-4'>
                            <div>
                                <p className='text-gray-500 text-sm'>Email</p>
                                <a 
                                    href='mailto:dakuravirtus@gmail.com'
                                    className='text-gray-300 hover:text-white transition-colors duration-300'
                                >
                                    dakuravirtus@gmail.com
                                </a>
                            </div>
                            <div>
                                <p className='text-gray-500 text-sm'>Location</p>
                                <p className='text-gray-300'>Accra, Ghana</p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className='mt-6'>
                            <p className='text-gray-500 text-sm mb-3'>Follow Me</p>
                            <div className='flex space-x-3'>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:transform hover:scale-110`}
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-800'>
                <div className='container mx-auto px-6 md:px-16 lg:px-24 py-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                        <div className='flex items-center text-gray-400 text-sm'>
                            <span>&copy; {new Date().getFullYear()} Virtus Dakura. Made with</span>
                            <FaHeart className='text-red-500 mx-2 animate-pulse' />
                            <span>All rights reserved.</span>
                        </div>
                        
                        <div className='flex items-center space-x-6'>
                            <a href='#' className='text-gray-400 hover:text-white text-sm transition-colors duration-300'>
                                Privacy Policy
                            </a>
                            <a href='#' className='text-gray-400 hover:text-white text-sm transition-colors duration-300'>
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className='fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 z-50'
                title='Scroll to top'
            >
                <FaArrowUp />
            </button>
        </footer>
    );
};

export default Footer;