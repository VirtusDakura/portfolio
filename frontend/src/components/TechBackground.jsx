import React from 'react';
import PropTypes from 'prop-types';

/**
 * TechBackground Component
 * 
 * Provides a clean, modern dark background (#09090B) with subtle ambient light spotlighting.
 */
const TechBackground = ({ children }) => {
    return (
        <>
            <div 
                id="tech-bg-global"
                className="fixed inset-0 z-[-1] overflow-hidden bg-[#09090b]"
            >
                {/* Subtle ambient light radial gradients */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent blur-3xl opacity-60 pointer-events-none"
                />
                <div 
                    className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-indigo-900/10 blur-3xl opacity-40 pointer-events-none"
                />

                {/* Subtle Grid Pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.15] pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>
            
            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </>
    );
};

TechBackground.propTypes = {
    children: PropTypes.node.isRequired
};

export default TechBackground;
