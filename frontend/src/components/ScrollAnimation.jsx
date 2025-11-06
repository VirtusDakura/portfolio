import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * ScrollAnimation Component
 * 
 * A reusable component that provides scroll-triggered animations using the Intersection Observer API.
 * Supports directional animations (left, right, up, down) with customizable timing and thresholds.
 * 
 * @component
 * @example
 * return (
 *   <ScrollAnimation direction="left" delay={200} duration={0.8}>
 *     <div>Content to animate</div>
 *   </ScrollAnimation>
 * )
 */
const ScrollAnimation = ({ 
    children, 
    direction = 'left', // Animation direction: 'left', 'right', 'up', 'down', 'fade'
    delay = 0, // Delay in milliseconds before animation starts
    duration = 0.8, // Animation duration in seconds
    threshold = 0.1, // Intersection threshold (0-1)
    className = '' // Additional CSS classes
}) => {
    // State to track if element is visible and should animate
    const [isVisible, setIsVisible] = useState(false);
    // Ref to the DOM element being observed
    const elementRef = useRef(null);

    useEffect(() => {
        // Create intersection observer to detect when element enters viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Apply delay before triggering animation
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            { 
                threshold, // Percentage of element that must be visible
                rootMargin: '50px' // Trigger animation slightly before element is fully visible
            }
        );

        // Store current element reference for cleanup
        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        // Cleanup observer on unmount
        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [delay, threshold]);

    // Define initial transform states for each direction
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

    // Final transform state (neutral position)
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
                willChange: 'transform, opacity' // Optimize for animations
            }}
        >
            {children}
        </div>
    );
};

// PropTypes for type checking and documentation
ScrollAnimation.propTypes = {
    /** Content to be animated */
    children: PropTypes.node.isRequired,
    /** Direction of animation */
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down', 'fade']),
    /** Delay before animation starts (in milliseconds) */
    delay: PropTypes.number,
    /** Animation duration (in seconds) */
    duration: PropTypes.number,
    /** Intersection observer threshold (0-1) */
    threshold: PropTypes.number,
    /** Additional CSS classes */
    className: PropTypes.string
};

export default ScrollAnimation;
