import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane, FaHeart, FaCopy, FaCheck } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

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
    const [copied, setCopied] = useState(false);

    const emailAddress = 'dakuravirtus@gmail.com';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
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
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        {
            icon: <FaLinkedin size={18} />,
            label: 'LinkedIn Profile',
            url: 'https://linkedin.com/in/virtus-dakura'
        },
        {
            icon: <FaGithub size={18} />,
            label: 'GitHub Profile',
            url: 'https://github.com/VirtusDakura'
        }
    ];

    return (
        <section id='contact' className='text-white py-16 sm:py-24 border-t border-zinc-800/60 pb-12'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                {/* Section Header */}
                <ScrollAnimation direction="up">
                    <div className='mb-12'>
                        <span className='text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md'>
                            04 // CONTACT
                        </span>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 text-white tracking-tight'>
                            Get In Touch
                        </h2>
                        <p className='text-zinc-400 text-base sm:text-lg max-w-2xl mt-2'>
                            Interested in collaborating, hiring for full-stack roles, or discussing software projects? Reach out directly.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className='grid lg:grid-cols-12 gap-10 lg:gap-12 items-start'>
                    {/* Left Column: Direct Contact Details */}
                    <ScrollAnimation direction="left" className='lg:col-span-5 space-y-6'>
                        {/* Direct Email Card */}
                        <div className='bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl'>
                            <h3 className='text-xl font-bold text-white tracking-tight mb-2'>Direct Email</h3>
                            <p className='text-xs text-zinc-400 mb-6'>Feel free to send an email directly or copy my address.</p>

                            <div className='flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-3 mb-4'>
                                <span className='text-xs sm:text-sm font-mono text-zinc-200 truncate pr-2'>{emailAddress}</span>
                                <button
                                    onClick={handleCopyEmail}
                                    className='flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer shrink-0'
                                >
                                    {copied ? <FaCheck className='text-emerald-300' /> : <FaCopy />}
                                    <span>{copied ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>

                            <div className='space-y-3 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400'>
                                <div className='flex items-center gap-2.5'>
                                    <FaMapMarkerAlt className='text-indigo-400' />
                                    <span>Accra, Ghana • Open to remote worldwide</span>
                                </div>
                                <div className='flex items-center gap-2.5'>
                                    <FaEnvelope className='text-indigo-400' />
                                    <span>Replies usually within 24 hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links Card */}
                        <div className='bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm'>
                            <h4 className='text-sm font-semibold text-white mb-3'>Social Channels</h4>
                            <div className='flex gap-3'>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex-1 flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white py-2.5 px-4 rounded-xl text-xs font-medium transition-colors duration-200'
                                    >
                                        {social.icon}
                                        <span>{social.label.split(' ')[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Right Column: Contact Form */}
                    <ScrollAnimation direction="right" className='lg:col-span-7'>
                        <div className='bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-zinc-800/80 shadow-xl'>
                            <h3 className='text-xl font-bold mb-6 text-white tracking-tight'>Send a Message</h3>

                            {submitStatus === 'success' && (
                                <div className='mb-6 p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-xl text-emerald-400 text-sm'>
                                    Thank you! Your message has been sent successfully. I will get back to you shortly.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className='mb-6 p-4 bg-rose-950/40 border border-rose-800/80 rounded-xl text-rose-400 text-sm'>
                                    Sorry, there was an issue processing your message. Please email me directly at dakuravirtus@gmail.com.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className='space-y-5'>
                                <div className='grid sm:grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor='name' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2'>
                                            Full Name *
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 text-sm text-white placeholder-zinc-600 ${errors.name ? 'border-rose-500' : 'border-zinc-800'
                                                }`}
                                            placeholder='e.g., Alex Morgan'
                                        />
                                        {errors.name && <p className='mt-1 text-xs text-rose-400'>{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor='email' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2'>
                                            Email Address *
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 text-sm text-white placeholder-zinc-600 ${errors.email ? 'border-rose-500' : 'border-zinc-800'
                                                }`}
                                            placeholder='alex@example.com'
                                        />
                                        {errors.email && <p className='mt-1 text-xs text-rose-400'>{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='subject' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2'>
                                        Subject *
                                    </label>
                                    <input
                                        type='text'
                                        id='subject'
                                        name='subject'
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 text-sm text-white placeholder-zinc-600 ${errors.subject ? 'border-rose-500' : 'border-zinc-800'
                                            }`}
                                        placeholder='Project Inquiry / Full-Stack Role'
                                    />
                                    {errors.subject && <p className='mt-1 text-xs text-rose-400'>{errors.subject}</p>}
                                </div>

                                <div>
                                    <label htmlFor='message' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2'>
                                        Message *
                                    </label>
                                    <textarea
                                        id='message'
                                        name='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 resize-none text-sm text-white placeholder-zinc-600 ${errors.message ? 'border-rose-500' : 'border-zinc-800'
                                            }`}
                                        placeholder='Tell me about your project, timeline, or engineering role...'
                                    />
                                    {errors.message && <p className='mt-1 text-xs text-rose-400'>{errors.message}</p>}
                                </div>

                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-colors duration-200 text-sm ${isSubmitting
                                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm cursor-pointer'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className='w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin'></div>
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

                {/* Footer Copyright */}
                <div className='border-t border-zinc-800/60 mt-16 pt-8 text-center text-xs text-zinc-500 flex justify-center items-center'>
                    <span>&copy; {new Date().getFullYear()} Virtus Dakura. All rights reserved.</span>
                </div>
            </div>
        </section>
    );
};

export default Contact;
