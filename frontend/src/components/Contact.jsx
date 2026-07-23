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

                <div className='grid lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
                    {/* Left Column: Direct Contact Details */}
                    <ScrollAnimation direction="left" className='lg:col-span-5 space-y-6'>
                        {/* Direct Email Card */}
                        <div className='relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl overflow-hidden group'>
                            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-80'></div>

                            <h3 className='text-xl font-bold text-white tracking-tight mb-1'>Direct Email</h3>
                            <p className='text-xs sm:text-sm text-zinc-400 mb-6'>Feel free to send an email directly or copy my address.</p>

                            <div className='flex items-center justify-between bg-zinc-950/90 border border-zinc-800/80 rounded-xl p-3 mb-5 group-hover:border-zinc-700 transition-colors duration-200'>
                                <span className='text-xs sm:text-sm font-mono text-zinc-200 truncate pr-2 break-all'>{emailAddress}</span>
                                <button
                                    onClick={handleCopyEmail}
                                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
                                        copied
                                            ? 'bg-emerald-600/90 text-white border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                                    }`}
                                >
                                    {copied ? <FaCheck className='text-white text-xs' /> : <FaCopy className='text-xs' />}
                                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>

                            <div className='space-y-3 pt-4 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-400'>
                                <div className='flex items-center gap-2.5'>
                                    <FaMapMarkerAlt className='text-indigo-400 text-sm shrink-0' />
                                    <span>Accra, Ghana • Open to remote worldwide</span>
                                </div>
                                <div className='flex items-center gap-2.5'>
                                    <FaEnvelope className='text-indigo-400 text-sm shrink-0' />
                                    <span>Replies usually within 24 hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links Card */}
                        <div className='bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-lg'>
                            <h4 className='text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-3'>Social Channels</h4>
                            <div className='grid grid-cols-2 gap-3'>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center justify-center gap-2 bg-zinc-950/80 border border-zinc-800/80 hover:border-indigo-500/40 text-zinc-300 hover:text-white py-2.5 px-4 rounded-xl text-xs font-medium transition-all duration-200 active:scale-95 shadow-sm'
                                    >
                                        <span className='text-indigo-400'>{social.icon}</span>
                                        <span>{social.label.split(' ')[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Right Column: Contact Form */}
                    <ScrollAnimation direction="right" className='lg:col-span-7'>
                        <div className='relative bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-zinc-800/80 shadow-xl overflow-hidden'>
                            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-80'></div>

                            <h3 className='text-xl sm:text-2xl font-bold mb-6 text-white tracking-tight'>Send a Message</h3>

                            {submitStatus === 'success' && (
                                <div className='mb-6 p-4 bg-emerald-950/50 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs sm:text-sm font-medium flex items-center gap-2.5'>
                                    <FaCheck className='text-emerald-400 shrink-0 text-base' />
                                    <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className='mb-6 p-4 bg-rose-950/50 border border-rose-800/80 rounded-xl text-rose-300 text-xs sm:text-sm font-medium'>
                                    Sorry, there was an issue processing your message. Please email me directly at dakuravirtus@gmail.com.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                                    <div>
                                        <label htmlFor='name' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5'>
                                            Full Name *
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 sm:py-3 bg-zinc-950/90 border rounded-xl focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 text-xs sm:text-sm text-white placeholder-zinc-600 ${errors.name ? 'border-rose-500/80' : 'border-zinc-800/80'
                                                }`}
                                            placeholder='e.g., Alex Morgan'
                                        />
                                        {errors.name && <p className='mt-1 text-xs text-rose-400'>{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor='email' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5'>
                                            Email Address *
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 sm:py-3 bg-zinc-950/90 border rounded-xl focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 text-xs sm:text-sm text-white placeholder-zinc-600 ${errors.email ? 'border-rose-500/80' : 'border-zinc-800/80'
                                                }`}
                                            placeholder='alex@example.com'
                                        />
                                        {errors.email && <p className='mt-1 text-xs text-rose-400'>{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='subject' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5'>
                                        Subject *
                                    </label>
                                    <input
                                        type='text'
                                        id='subject'
                                        name='subject'
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 sm:py-3 bg-zinc-950/90 border rounded-xl focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 text-xs sm:text-sm text-white placeholder-zinc-600 ${errors.subject ? 'border-rose-500/80' : 'border-zinc-800/80'
                                            }`}
                                        placeholder='Project Inquiry / Full-Stack Role'
                                    />
                                    {errors.subject && <p className='mt-1 text-xs text-rose-400'>{errors.subject}</p>}
                                </div>

                                <div>
                                    <label htmlFor='message' className='block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5'>
                                        Message *
                                    </label>
                                    <textarea
                                        id='message'
                                        name='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-4 py-2.5 sm:py-3 bg-zinc-950/90 border rounded-xl focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 resize-none text-xs sm:text-sm text-white placeholder-zinc-600 ${errors.message ? 'border-rose-500/80' : 'border-zinc-800/80'
                                            }`}
                                        placeholder='Tell me about your project, timeline, or engineering role...'
                                    />
                                    {errors.message && <p className='mt-1 text-xs text-rose-400'>{errors.message}</p>}
                                </div>

                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm cursor-pointer select-none active:scale-95 ${isSubmitting
                                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className='w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin'></div>
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className='text-xs sm:text-sm' />
                                            <span>Send Message</span>
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
