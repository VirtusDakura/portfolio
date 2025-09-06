import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkedAlt, FaLinkedin, FaGithub, FaPaperPlane, FaHeart, FaArrowUp } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus('');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const contactInfo = [
        {
            icon: <FaEnvelope className="text-blue-500" />,
            label: 'Email',
            value: 'dakuravirtus@gmail.com',
            link: 'mailto:dakuravirtus@gmail.com'
        },
        {
            icon: <FaPhone className="text-green-500" />,
            label: 'Phone',
            value: '+233 596 621 148',
            link: 'tel:+2330596621148'
        },
        {
            icon: <FaMapMarkedAlt className="text-purple-500" />,
            label: 'Location',
            value: 'Accra, Ghana',
            link: '#'
        }
    ];

    const socialLinks = [
        {
            icon: <FaLinkedin />,
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/virtus-dakura',
            color: 'hover:text-blue-500'
        },
        {
            icon: <FaGithub />,
            label: 'GitHub',
            url: 'https://github.com/VirtusDakura',
            color: 'hover:text-gray-300'
        }
    ];

    return (
        <section id='contact' className='bg-black text-white py-20'>
            <div className='container mx-auto px-6 md:px-16 lg:px-24'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                        Get In <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Touch</span>
                    </h2>
                    <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
                        Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
                    </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-16'>
                    {/* Contact Information */}
                    <div>
                        <h3 className='text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                            Let's Connect
                        </h3>
                        
                        <p className='text-gray-400 mb-8 leading-relaxed'>
                            I'm always open to discussing new opportunities, innovative projects, and interesting challenges. 
                            Whether you have a question or just want to say hi, I'll do my best to get back to you!
                        </p>

                        {/* Contact Details */}
                        <div className='space-y-6 mb-8'>
                            {contactInfo.map((item, index) => (
                                <div key={index} className='flex items-center group'>
                                    <div className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-700 transition-colors duration-300'>
                                        <span className='text-xl'>{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className='text-gray-500 text-sm'>{item.label}</p>
                                        <a 
                                            href={item.link} 
                                            className='text-white hover:text-blue-400 transition-colors duration-300'
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className='text-lg font-semibold mb-4 text-gray-300'>Follow Me</h4>
                            <div className='flex space-x-4'>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:transform hover:scale-110 cursor-pointer`}
                                        title={social.label}
                                    >
                                        <span className='text-xl'>{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className='bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800'>
                        <h3 className='text-2xl font-bold mb-6 text-white'>Send a Message</h3>
                        
                        {submitStatus === 'success' && (
                            <div className='mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400'>
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}
                        
                        {submitStatus === 'error' && (
                            <div className='mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400'>
                                Sorry, there was an error sending your message. Please try again.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-300 mb-2'>
                                        Full Name *
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                            errors.name ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                        }`}
                                        placeholder='Enter your name'
                                    />
                                    {errors.name && <p className='mt-1 text-sm text-red-400'>{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                                        Email Address *
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                            errors.email ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                        }`}
                                        placeholder='Enter your email'
                                    />
                                    {errors.email && <p className='mt-1 text-sm text-red-400'>{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor='subject' className='block text-sm font-medium text-gray-300 mb-2'>
                                    Subject *
                                </label>
                                <input
                                    type='text'
                                    id='subject'
                                    name='subject'
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                        errors.subject ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                    }`}
                                    placeholder='What is this about?'
                                />
                                {errors.subject && <p className='mt-1 text-sm text-red-400'>{errors.subject}</p>}
                            </div>

                            <div>
                                <label htmlFor='message' className='block text-sm font-medium text-gray-300 mb-2'>
                                    Message *
                                </label>
                                <textarea
                                    id='message'
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 resize-none ${
                                        errors.message ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                    }`}
                                    placeholder='Tell me about your project...'
                                />
                                {errors.message && <p className='mt-1 text-sm text-red-400'>{errors.message}</p>}
                            </div>

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                                    isSubmitting
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 cursor-pointer'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className='w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className='border-t border-gray-800 mt-20 pt-8'>
                    <div className='flex justify-center items-center'>
                        <div className='flex items-center text-gray-400 text-sm'>
                            <span>&copy; {new Date().getFullYear()} Virtus Dakura. Made with</span>
                            <FaHeart className='text-red-500 mx-2 animate-pulse' />
                            <span>All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className='fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 z-50 cursor-pointer'
                title='Scroll to top'
            >
                <FaArrowUp />
            </button>
        </section>
    );
};

export default Contact;
