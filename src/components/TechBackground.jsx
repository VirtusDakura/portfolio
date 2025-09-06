import React, { useState, useEffect, useCallback, useMemo } from 'react';

const TechBackground = ({ children, section = 'default' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animationsEnabled, setAnimationsEnabled] = useState(true);

    // Section-specific configurations for variety
    const sectionConfig = useMemo(() => {
        const configs = {
            hero: {
                primaryColor: 'blue-500',
                secondaryColor: 'purple-500',
                accentColor: 'cyan-500',
                particleCount: 6,
                gridOpacity: 0.25,
                orbSize: { primary: 'w-32 h-32', secondary: 'w-24 h-24', tertiary: 'w-20 h-20' }
            },
            about: {
                primaryColor: 'purple-500',
                secondaryColor: 'cyan-500',
                accentColor: 'blue-500',
                particleCount: 5,
                gridOpacity: 0.22,
                orbSize: { primary: 'w-28 h-28', secondary: 'w-20 h-20', tertiary: 'w-16 h-16' }
            },
            services: {
                primaryColor: 'cyan-500',
                secondaryColor: 'blue-500',
                accentColor: 'purple-500',
                particleCount: 5,
                gridOpacity: 0.20,
                orbSize: { primary: 'w-30 h-30', secondary: 'w-22 h-22', tertiary: 'w-18 h-18' }
            },
            projects: {
                primaryColor: 'blue-500',
                secondaryColor: 'cyan-500',
                accentColor: 'purple-500',
                particleCount: 6,
                gridOpacity: 0.24,
                orbSize: { primary: 'w-36 h-36', secondary: 'w-26 h-26', tertiary: 'w-22 h-22' }
            },
            contact: {
                primaryColor: 'purple-500',
                secondaryColor: 'blue-500',
                accentColor: 'cyan-500',
                particleCount: 4,
                gridOpacity: 0.18,
                orbSize: { primary: 'w-24 h-24', secondary: 'w-18 h-18', tertiary: 'w-14 h-14' }
            }
        };
        return configs[section] || configs.hero;
    }, [section]);

    // Lazy loading with Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once loaded
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        const element = document.getElementById(`tech-bg-${section}`);
        if (element) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [section]);

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
                    className={`absolute top-1/4 left-1/4 ${sectionConfig.orbSize.primary} bg-${sectionConfig.primaryColor}/40 rounded-full blur-2xl`}
                    style={{
                        animation: 'float 6s ease-in-out infinite, orbPulse 3s ease-in-out infinite',
                        willChange: 'transform'
                    }}
                />
                
                {/* Secondary Orb with rotation */}
                <div 
                    className={`absolute bottom-1/3 right-1/4 ${sectionConfig.orbSize.secondary} bg-${sectionConfig.secondaryColor}/40 rounded-full blur-xl`}
                    style={{
                        animation: 'float 8s ease-in-out infinite reverse, orbRotate 12s linear infinite',
                        animationDelay: '2s',
                        willChange: 'transform'
                    }}
                />
                
                {/* Tertiary Bouncing Orb */}
                <div 
                    className={`absolute top-1/2 right-1/3 ${sectionConfig.orbSize.tertiary} bg-${sectionConfig.accentColor}/40 rounded-full blur-lg`}
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
                    className={`absolute ${isLarge ? 'w-2 h-2' : 'w-1 h-1'} bg-${sectionConfig.primaryColor}/60 rounded-full`}
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
        <div 
            id={`tech-bg-${section}`}
            className="relative min-h-screen overflow-hidden"
        >
            {/* Enhanced gradient background with mobile menu style */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800">
                {/* Additional gradient layers for depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
                <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/5 via-transparent to-blue-900/5" />
            </div>
            
            {/* Tech elements - only render when visible */}
            {isVisible && (
                <>
                    {/* Enhanced Grid Pattern */}
                    {gridPattern()}
                    
                    {/* Enhanced Animated Orbs */}
                    {animatedOrbs()}
                    
                    {/* Enhanced Tech Particles */}
                    {techParticles()}
                    
                    {/* Enhanced Corner Tech Accents with animations */}
                    <div className={`absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-${sectionConfig.primaryColor}/50 opacity-70`} 
                         style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none' }} />
                    <div className={`absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-${sectionConfig.secondaryColor}/50 opacity-70`}
                         style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none', animationDelay: '1s' }} />
                    <div className={`absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-${sectionConfig.accentColor}/50 opacity-70`}
                         style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none', animationDelay: '2s' }} />
                    <div className={`absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-${sectionConfig.primaryColor}/50 opacity-70`}
                         style={{ animation: animationsEnabled ? 'borderGlow 4s ease-in-out infinite' : 'none', animationDelay: '3s' }} />
                </>
            )}
            
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
            
            {/* Enhanced CSS Animations matching mobile menu */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes gridShift {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(-25px, 0); }
                    50% { transform: translate(-25px, -25px); }
                    75% { transform: translate(0, -25px); }
                    100% { transform: translate(0, 0); }
                }
                
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                
                @keyframes orbRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                
                @keyframes scanHorizontal {
                    0% { transform: translateX(-100vw); }
                    100% { transform: translateX(100vw); }
                }
                
                @keyframes scanVertical {
                    0% { transform: translateY(-100vh); }
                    100% { transform: translateY(100vh); }
                }
                
                @keyframes borderGlow {
                    0%, 100% { opacity: 0.7; box-shadow: 0 0 5px currentColor; }
                    50% { opacity: 1; box-shadow: 0 0 15px currentColor; }
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-30px); }
                    60% { transform: translateY(-15px); }
                }
                
                /* Reduce motion for accessibility */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default TechBackground;
