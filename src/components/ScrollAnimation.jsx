import React, { useState, useEffect, useRef } from 'react';

const ScrollAnimation = ({ 
    children, 
    direction = 'left', // 'left', 'right', 'up', 'down'
    delay = 0,
    duration = 0.8,
    threshold = 0.1,
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            { 
                threshold,
                rootMargin: '50px'
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [delay, threshold]);

    // Direction-based transform classes
    const getInitialTransform = () => {
        switch (direction) {
            case 'left':
                return 'translate-x-[-100px]';
            case 'right':
                return 'translate-x-[100px]';
            case 'up':
                return 'translate-y-[-50px]';
            case 'down':
                return 'translate-y-[50px]';
            case 'fade':
                return '';
            default:
                return 'translate-x-[-100px]';
        }
    };

    const getFinalTransform = () => {
        return 'translate-x-0 translate-y-0';
    };

    return (
        <div
            ref={elementRef}
            className={`
                transition-all ease-out opacity-0
                ${isVisible 
                    ? `opacity-100 ${getFinalTransform()}` 
                    : `opacity-0 ${getInitialTransform()}`
                }
                ${className}
            `}
            style={{
                transitionDuration: `${duration}s`,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </div>
    );
};

export default ScrollAnimation;
