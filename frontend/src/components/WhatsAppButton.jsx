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
            className="fixed bottom-24 right-8 w-12 h-12 bg-[#25D366] text-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-[#25D366]/40 transform hover:scale-110 transition-all duration-300 z-50 cursor-pointer group"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
        >
            {/* Pulsing background effect */}
            <span className="absolute inset-0 rounded-lg bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>
            
            <FaWhatsapp className="text-2xl relative z-10" />
            
            {/* Tooltip for desktop */}
            <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden sm:block border border-gray-800">
                Chat on WhatsApp
            </span>
        </a>
    );
};

export default WhatsAppButton;
