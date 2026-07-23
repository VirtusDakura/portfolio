import React, { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub, FaMapMarkerAlt, FaCopy, FaCheck, FaPaperPlane } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const emailAddress = 'dakuravirtus@gmail.com';
    const phoneNumber = '233596621148';
    const whatsappMessage = encodeURIComponent("Hello Virtus! I'm interested in collaborating or discussing a project.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id='contact' className='text-white py-10 sm:py-16 border-t border-zinc-800/60 pb-8'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-28'>
                {/* Section Header */}
                <ScrollAnimation direction="up">
                    <div className='mb-8 sm:mb-10'>
                        <h2 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight'>
                            Get In Touch
                        </h2>
                        <p className='text-zinc-400 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed'>
                            Interested in full-stack engineering roles, technical collaboration, or discussing software projects? Reach out directly.
                        </p>
                    </div>
                </ScrollAnimation>

                {/* 3 High-Impact Direct Action Cards */}
                <ScrollAnimation direction="up" delay={200}>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch mb-12 sm:mb-16'>
                        {/* 1. Direct Email Card */}
                        <div className='relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl flex flex-col justify-between group hover:border-indigo-500/40 transition-all duration-300 overflow-hidden'>
                            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-80'></div>

                            <div>
                                <div className='w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl mb-3 sm:mb-4 group-hover:bg-indigo-500/20 transition-colors duration-200'>
                                    <FaEnvelope />
                                </div>
                                <h3 className='text-lg font-bold text-white tracking-tight mb-1'>Direct Email</h3>
                                <p className='text-xs text-zinc-400 leading-relaxed mb-4'>
                                    Send me an email directly or copy my address for your primary mail client.
                                </p>
                            </div>

                            <div className='space-y-3 pt-4 border-t border-zinc-800/60 mt-auto'>
                                <div className='flex items-center justify-between bg-zinc-950/90 border border-zinc-800/80 rounded-xl p-2.5'>
                                    <span className='text-xs font-mono text-zinc-200 truncate pr-2'>{emailAddress}</span>
                                    <button
                                        onClick={handleCopyEmail}
                                        className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
                                            copied
                                                ? 'bg-emerald-600/90 text-white border border-emerald-500/50'
                                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                                        }`}
                                    >
                                        {copied ? <FaCheck className='text-white' /> : <FaCopy />}
                                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                                    </button>
                                </div>

                                <a
                                    href={`mailto:${emailAddress}`}
                                    className='w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium py-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-200 active:scale-95'
                                >
                                    <FaPaperPlane className='text-xs' />
                                    <span>Send Email Now</span>
                                </a>
                            </div>
                        </div>

                        {/* 2. Instant WhatsApp Chat Card */}
                        <div className='relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300 overflow-hidden'>
                            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-80'></div>

                            <div>
                                <div className='w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl mb-3 sm:mb-4 group-hover:bg-emerald-500/20 transition-colors duration-200 relative'>
                                    <FaWhatsapp />
                                    <span className='absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-zinc-950 flex items-center justify-center'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping'></span>
                                    </span>
                                </div>
                                <h3 className='text-lg font-bold text-white tracking-tight mb-1'>WhatsApp Instant Chat</h3>
                                <p className='text-xs text-zinc-400 leading-relaxed mb-4'>
                                    Fastest response channel for project consultation and direct communication.
                                </p>
                            </div>

                            <div className='pt-4 border-t border-zinc-800/60 mt-auto'>
                                <a
                                    href={whatsappUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-medium py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-200 active:scale-95'
                                >
                                    <FaWhatsapp className='text-sm' />
                                    <span>Start Direct WhatsApp Chat</span>
                                </a>
                            </div>
                        </div>

                        {/* 3. Professional Networks Card */}
                        <div className='relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300 overflow-hidden'>
                            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 opacity-80'></div>

                            <div>
                                <div className='w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-xl mb-3 sm:mb-4 group-hover:bg-sky-500/20 transition-colors duration-200'>
                                    <FaLinkedin />
                                </div>
                                <h3 className='text-lg font-bold text-white tracking-tight mb-1'>Professional Networks</h3>
                                <p className='text-xs text-zinc-400 leading-relaxed mb-4'>
                                    Connect on LinkedIn or review open-source repositories and code commits on GitHub.
                                </p>
                            </div>

                            <div className='space-y-2.5 pt-4 border-t border-zinc-800/60 mt-auto'>
                                <a
                                    href='https://linkedin.com/in/virtus-dakura'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='w-full flex items-center justify-center gap-2 bg-zinc-950/80 border border-zinc-800 hover:border-sky-500/50 text-zinc-200 hover:text-white text-xs font-medium py-2.5 rounded-xl transition-all duration-200 active:scale-95'
                                >
                                    <FaLinkedin className='text-sky-400 text-sm' />
                                    <span>LinkedIn Profile</span>
                                </a>
                                <a
                                    href='https://github.com/VirtusDakura'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='w-full flex items-center justify-center gap-2 bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-medium py-2.5 rounded-xl transition-all duration-200 active:scale-95'
                                >
                                    <FaGithub className='text-zinc-300 text-sm' />
                                    <span>GitHub Profile</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Footer Copyright */}
                <div className='border-t border-zinc-800/60 pt-8 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3'>
                    <div className='flex items-center gap-2 text-zinc-400'>
                        <FaMapMarkerAlt className='text-indigo-400 text-xs' />
                        <span>Accra, Ghana • Open to Remote Worldwide</span>
                    </div>
                    <span>&copy; {new Date().getFullYear()} Virtus Dakura. All rights reserved.</span>
                </div>
            </div>
        </section>
    );
};

export default Contact;
