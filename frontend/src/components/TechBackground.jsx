import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * TechBackground Component
 * 
 * A sophisticated animated background component that creates an immersive tech aesthetic
 * with floating particles, animated grids, glowing orbs, and scanning lines.
 * Each section can have unique configurations for visual variety.
 * 
 * Features:
 * - Section-specific color schemes and animations
 * - Performance optimizations with reduced motion support
 * - Responsive design with device-specific optimizations
 * - Memory-efficient particle management
 * 
 * @component
 * @example
 * return (
 *   <TechBackground section="hero">
 *     <div>Your content here</div>
 *   </TechBackground>
 * )
 */
const TechBackground = ({ children }) => {
    // State management for animations and performance
    const [isVisible, setIsVisible] = useState(false);
    const [animationsEnabled, setAnimationsEnabled] = useState(true);

    // Fade in after initial mount to avoid blocking first paint
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Map base colors to their full Tailwind class equivalents for the JIT compiler
    const colorMap = {
        'blue-500': { bg40: 'bg-blue-500/40', bg60: 'bg-blue-500/60', border50: 'border-blue-500/50' },
        'purple-500': { bg40: 'bg-purple-500/40', bg60: 'bg-purple-500/60', border50: 'border-purple-500/50' },
        'cyan-500': { bg40: 'bg-cyan-500/40', bg60: 'bg-cyan-500/60', border50: 'border-cyan-500/50' }
    };

    // Section-specific configurations for variety
    const sectionConfig = useMemo(() => {
        return {
            primary: colorMap['blue-500'],
            secondary: colorMap['purple-500'],
            accent: colorMap['cyan-500'],
            particleCount: 15,
            gridOpacity: 0.25,
            orbSize: { primary: 'w-32 h-32', secondary: 'w-24 h-24', tertiary: 'w-20 h-20' }
        };
    }, []);



    // Performance optimization: disable animations on low-end devices
    useEffect(() => {
        const checkPerformance = () => {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
            const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (isSlowConnection || isLowEndDevice || prefersReducedMotion) {
                setAnimationsEnabled(false);
            }
        };

        checkPerformance();
    }, []);

    // Memoized grid pattern with mobile menu style
    const gridPattern = useCallback(() => {
        if (!isVisible) return null;
        
        return (
            <div className="absolute inset-0">
                {/* Tech Grid Background with animation */}
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, ${sectionConfig.gridOpacity * 0.3}) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, ${sectionConfig.gridOpacity * 0.3}) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        willChange: 'transform',
                        animation: animationsEnabled ? 'gridShift 20s linear infinite' : 'none'
                    }}
                />
                
                {/* Animated Scanning Lines - enhanced visibility */}
                {animationsEnabled && (
                    <>
                        <div 
                            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"
                            style={{
                                animation: 'scanHorizontal 8s linear infinite',
                                willChange: 'transform'
                            }}
                        />
                        <div 
                            className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/80 to-transparent"
                            style={{
                                animation: 'scanVertical 10s linear infinite',
                                animationDelay: '2s',
                                willChange: 'transform'
                            }}
                        />
                    </>
                )}
            </div>
        );
    }, [isVisible, sectionConfig.gridOpacity, animationsEnabled]);

    // Enhanced animated orbs like mobile menu
    const animatedOrbs = useCallback(() => {
        if (!isVisible || !animationsEnabled) return null;

        return (
            <>
                {/* Primary Large Orb with pulse */}
                <div 
                    className={`absolute top-1/4 left-1/4 ${sectionConfig.orbSize.primary} ${sectionConfig.primary.bg40} rounded-full blur-2xl`}
                    style={{
                        animation: 'float 6s ease-in-out infinite, orbPulse 3s ease-in-out infinite',
                        willChange: 'transform'
                    }}
                />
                
                {/* Secondary Orb with rotation */}
                <div 
                    className={`absolute bottom-1/3 right-1/4 ${sectionConfig.orbSize.secondary} ${sectionConfig.secondary.bg40} rounded-full blur-xl`}
                    style={{
                        animation: 'float 8s ease-in-out infinite reverse, orbRotate 12s linear infinite',
                        animationDelay: '2s',
                        willChange: 'transform'
                    }}
                />
                
                {/* Tertiary Bouncing Orb */}
                <div 
                    className={`absolute top-1/2 right-1/3 ${sectionConfig.orbSize.tertiary} ${sectionConfig.accent.bg40} rounded-full blur-lg`}
                    style={{
                        animation: 'bounce 4s ease-in-out infinite, orbPulse 2s ease-in-out infinite',
                        animationDelay: '1s',
                        willChange: 'transform'
                    }}
                />
                
                {/* Additional mobile menu style orbs */}
                <div 
                    className="absolute top-3/4 left-1/3 w-16 h-16 bg-cyan-500/35 rounded-full blur-lg"
                    style={{
                        animation: 'float 5s ease-in-out infinite, orbPulse 4s ease-in-out infinite',
                        animationDelay: '3s',
                        willChange: 'transform'
                    }}
                />
            </>
        );
    }, [isVisible, animationsEnabled, sectionConfig]);

    // Enhanced tech particles with mobile menu effects
    const techParticles = useCallback(() => {
        if (!isVisible || !animationsEnabled) return null;

        const particles = [];
        const particleCount = window.innerWidth < 768 ? 
            Math.max(2, Math.floor(sectionConfig.particleCount / 2)) : 
            sectionConfig.particleCount;

        for (let i = 0; i < particleCount; i++) {
            const isLarge = Math.random() > 0.7;
            particles.push(
                <div
                    key={i}
                    className={`absolute ${isLarge ? 'w-2 h-2' : 'w-1 h-1'} ${sectionConfig.primary.bg60} rounded-full`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `twinkle ${3 + Math.random() * 2}s linear infinite, float ${8 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                        willChange: 'opacity, transform',
                        boxShadow: `0 0 ${isLarge ? '8px' : '4px'} currentColor`
                    }}
                />
            );
        }

        return particles;
    }, [isVisible, animationsEnabled, sectionConfig]);

    return (
        <>
            <div 
                id="tech-bg-global"
                className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800"
            >
                {/* Additional gradient layers for depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
                <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/5 via-transparent to-blue-900/5" />
                
                {/* Tech elements - only render when visible */}
                {isVisible && (
                    <div className="transition-opacity duration-1000 opacity-100">
                        {gridPattern()}
                        {animatedOrbs()}
                        {techParticles()}
                        
                        <div className={`absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 ${sectionConfig.primary.border50} opacity-70`} 
                             style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none' }} />
                        <div className={`absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 ${sectionConfig.secondary.border50} opacity-70`}
                             style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none', animationDelay: '1s' }} />
                        <div className={`absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 ${sectionConfig.accent.border50} opacity-70`}
                             style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none', animationDelay: '2s' }} />
                        <div className={`absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 ${sectionConfig.primary.border50} opacity-70`}
                             style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none', animationDelay: '3s' }} />
                    </div>
                )}
            </div>
            
            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </>
    );
};

// PropTypes for type checking and documentation
TechBackground.propTypes = {
    /** Content to be rendered with the tech background */
    children: PropTypes.node.isRequired
};

export default TechBackground;
