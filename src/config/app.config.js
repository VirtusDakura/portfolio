/**
 * Application Configuration
 * 
 * Centralized configuration for the portfolio application.
 * Handles environment variables, API endpoints, and feature flags.
 */

// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  endpoints: {
    contact: import.meta.env.VITE_CONTACT_API_ENDPOINT || '/contact',
    projects: import.meta.env.VITE_PROJECTS_API_ENDPOINT || '/projects',
    skills: '/skills',
    experience: '/experience'
  },
  timeout: 10000, // 10 seconds
  retryAttempts: 3
};

// Email Service Configuration (EmailJS or similar)
export const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  trackingId: import.meta.env.VITE_GA_TRACKING_ID,
  enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true'
};

// Feature Flags
export const FEATURES = {
  contactForm: import.meta.env.VITE_ENABLE_CONTACT_FORM !== 'false',
  dynamicProjects: import.meta.env.VITE_ENABLE_DYNAMIC_PROJECTS === 'true',
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  devMode: import.meta.env.VITE_DEV_MODE === 'true'
};

// Application Constants
export const APP_CONFIG = {
  name: 'Virtus Dakura Portfolio',
  version: '1.0.0',
  author: 'Virtus Dakura',
  description: 'Modern portfolio showcasing software engineering expertise',
  url: 'https://virtusdakura.dev', // Update with your domain
  social: {
    github: 'https://github.com/VirtusDakura',
    linkedin: 'https://linkedin.com/in/virtusdakura',
    twitter: 'https://twitter.com/virtusdakura',
    email: 'contact@virtusdakura.dev'
  }
};

// Animation and Performance Settings
export const PERFORMANCE_CONFIG = {
  lazyLoadThreshold: 0.1,
  animationDuration: 0.8,
  debounceDelay: 300,
  throttleDelay: 100,
  imageOptimization: true,
  prefersReducedMotion: typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection and try again.',
  server: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  generic: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  contactForm: 'Thank you for your message! I\'ll get back to you soon.',
  subscribe: 'Successfully subscribed to updates!',
  generic: 'Action completed successfully!'
};

export default {
  API_CONFIG,
  EMAIL_CONFIG,
  ANALYTICS_CONFIG,
  FEATURES,
  APP_CONFIG,
  PERFORMANCE_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};
