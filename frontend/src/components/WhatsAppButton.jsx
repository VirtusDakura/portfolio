import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * WhatsAppButton Component
 * 
 * A floating action button that opens a WhatsApp chat with the developer.
 * Includes a subtle pulse animation to attract attention.
 * 
 * @component
 */
const WhatsAppButton = () => {
    const phoneNumber = '233596621148'; // Formatted for WhatsApp URL (no spaces or '+')
    const message = encodeURIComponent("Hello Virtus! I'm interested in working with you.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 z-50 cursor-pointer group"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
        >
            {/* Online status pulsing dot */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-zinc-950 rounded-full z-20 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
            </span>

            <FaWhatsapp className="text-2xl sm:text-3xl relative z-10" />

            {/* Tooltip for desktop */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-zinc-900/95 text-zinc-200 text-xs font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden sm:block border border-zinc-800 shadow-xl backdrop-blur-md">
                Chat on WhatsApp
            </span>
        </a>
    );
};

export default WhatsAppButton;

