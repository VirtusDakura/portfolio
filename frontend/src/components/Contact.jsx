import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkedAlt, FaLinkedin, FaGithub, FaPaperPlane, FaHeart, FaArrowUp } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { saveContactMessage } from '../utils/sanity';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Check if mobile menu is open by monitoring body overflow and scroll position
    useEffect(() => {
        const checkMobileMenu = () => {
            const bodyOverflow = document.body.style.overflow;
            setIsMobileMenuOpen(bodyOverflow === 'hidden');
        };

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setShowScrollTop(scrollTop > 300); // Show button after scrolling 300px
        };

        // Create observer for body style changes
        const observer = new MutationObserver(checkMobileMenu);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style']
        });

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        // Initial checks
        checkMobileMenu();
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            // Run both operations in parallel
            const results = await Promise.allSettled([
                // 1. Save to Sanity CMS
                saveContactMessage({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }),
                // 2. Send email via Web3Forms
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        from_name: 'Portfolio Contact Form',
                    })
                }).then(res => res.json())
            ]);

            // Check results - success if at least one worked
            const sanityResult = results[0];
            const emailResult = results[1];

            const sanitySuccess = sanityResult.status === 'fulfilled';
            const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value?.success;

            if (sanitySuccess || emailSuccess) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });

                // Log any partial failures for debugging
                if (!sanitySuccess) console.warn('Sanity save failed:', sanityResult.reason);
                if (!emailSuccess) console.warn('Email send failed:', emailResult.reason || emailResult.value);
            } else {
                throw new Error('Both operations failed');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToTop = () => {
        // Modern smooth scroll with easing
        const scrollToTopWithEasing = () => {
            const startPosition = window.pageYOffset;
            const targetPosition = 0;
            const distance = startPosition - targetPosition;
            const duration = 1000; // 1 second
            let start = null;

            const easeInOutCubic = (t) => {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };

            const animation = (currentTime) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);

                window.scrollTo(0, startPosition - distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        };

        scrollToTopWithEasing();
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
        <section id='contact' className='text-white pt-12 sm:pt-16 lg:pt-20 pb-8'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32'>
                <ScrollAnimation direction="up">
                    <div className='text-center mb-12 sm:mb-16'>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                            Get In <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>Touch</span>
                        </h2>
                        <p className='text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0'>
                            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16'>
                    {/* Contact Information */}
                    <ScrollAnimation direction="left">
                        <div className='px-2 sm:px-0 text-center lg:text-left'>
                            <h3 className='text-xl sm:text-2xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                                Let's Connect
                            </h3>

                            <p className='text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base'>
                                I'm always open to discussing new opportunities, innovative projects, and interesting challenges.
                                Whether you have a question or just want to say hi, I'll do my best to get back to you!
                            </p>

                            {/* Contact Details */}
                            <div className='space-y-4 sm:space-y-6 mb-6 sm:mb-8'>
                                {contactInfo.map((item, index) => (
                                    <div key={index} className='flex items-center group justify-center lg:justify-start'>
                                        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-gray-700 transition-colors duration-300'>
                                            <span className='text-sm sm:text-lg'>{item.icon}</span>
                                        </div>
                                        <div>
                                            <p className='text-gray-500 text-xs sm:text-sm'>{item.label}</p>
                                            <a
                                                href={item.link}
                                                className='text-white hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base'
                                            >
                                                {item.value}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className='text-center lg:text-left'>
                                <h4 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-300'>Follow Me</h4>
                                <div className='flex space-x-4 justify-center lg:justify-start'>
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={`w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:transform hover:scale-110 cursor-pointer`}
                                            title={social.label}
                                        >
                                            <span className='text-sm sm:text-lg'>{social.icon}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Contact Form */}
                    <ScrollAnimation direction="right">
                        <div className='bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800'>
                            <h3 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white'>Send a Message</h3>

                            {submitStatus === 'success' && (
                                <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400 text-sm sm:text-base'>
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm sm:text-base'>
                                    Sorry, there was an error sending your message. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                                <div className='grid md:grid-cols-2 gap-4 sm:gap-6'>
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
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base ${errors.name ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                                }`}
                                            placeholder='Enter your name'
                                        />
                                        {errors.name && <p className='mt-1 text-xs sm:text-sm text-red-400'>{errors.name}</p>}
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
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                                }`}
                                            placeholder='Enter your email'
                                        />
                                        {errors.email && <p className='mt-1 text-xs sm:text-sm text-red-400'>{errors.email}</p>}
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
                                        className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base ${errors.subject ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                            }`}
                                        placeholder='What is this about?'
                                    />
                                    {errors.subject && <p className='mt-1 text-xs sm:text-sm text-red-400'>{errors.subject}</p>}
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
                                        rows={4}
                                        className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 resize-none text-sm sm:text-base ${errors.message ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                            }`}
                                        placeholder='Tell me about your project...'
                                    />
                                    {errors.message && <p className='mt-1 text-xs sm:text-sm text-red-400'>{errors.message}</p>}
                                </div>

                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${isSubmitting
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 cursor-pointer'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className='w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
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
                    </ScrollAnimation>
                </div>

                {/* Copyright Section */}
                <ScrollAnimation direction="up">
                    <div className='border-t border-gray-800 mt-12 pt-6'>
                        <div className='flex justify-center items-center px-4'>
                            <div className='flex flex-col sm:flex-row items-center justify-center text-gray-400 text-xs sm:text-sm text-center'>
                                <div className='flex items-center'>
                                    <span>&copy; {new Date().getFullYear()} Virtus Dakura. Made with</span>
                                    <FaHeart className='text-red-500 mx-1 sm:mx-2 animate-pulse' />
                                </div>
                                <span className='mt-1 sm:mt-0'>All rights reserved.</span>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>

            {/* Dynamic Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-500 z-50 cursor-pointer ${(showScrollTop && !isMobileMenuOpen)
                    ? 'opacity-100 pointer-events-auto translate-y-0'
                    : 'opacity-0 pointer-events-none translate-y-4'
                    }`}
                title='Scroll to top'
                style={{
                    willChange: 'transform, opacity',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <FaArrowUp className="transform group-hover:scale-110 transition-transform duration-300" />
            </button>
        </section>
    );
};

export default Contact;
