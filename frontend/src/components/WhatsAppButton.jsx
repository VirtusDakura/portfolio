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
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-[#25D366]/20 transition-all duration-200 z-50 cursor-pointer group"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="text-2xl relative z-10" />
            
            {/* Tooltip for desktop */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-zinc-900 text-zinc-200 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden sm:block border border-zinc-800 shadow-xl">
                Chat on WhatsApp
            </span>
        </a>
    );
};

export default WhatsAppButton;
