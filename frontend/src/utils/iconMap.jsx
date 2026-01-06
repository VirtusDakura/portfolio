import React from 'react';
import {
    FaCode,
    FaMobile,
    FaServer,
    FaDatabase,
    FaCloud,
    FaRocket,
    FaReact,
    FaNodeJs,
    FaPython,
    FaGitAlt,
    FaFigma
} from 'react-icons/fa';
import {
    SiJavascript,
    SiTypescript,
    SiMongodb,
    SiExpress,
    SiTailwindcss,
    SiNextdotjs,
    SiPostgresql,
    SiVite,
    SiRedis,
    SiPrisma,
    SiDocker,
    SiAmazon,
    SiVercel,
    SiGithubactions,
    SiRedux,
    SiFirebase,
    SiExpo
} from 'react-icons/si';

// Map icon names from Sanity to actual React icons
export const iconMap = {
    // Skill/Service icons
    'code': FaCode,
    'mobile': FaMobile,
    'server': FaServer,
    'database': FaDatabase,
    'cloud': FaCloud,
    'rocket': FaRocket,

    // Technology icons
    'react': FaReact,
    'nodejs': FaNodeJs,
    'python': FaPython,
    'git': FaGitAlt,
    'figma': FaFigma,
    'javascript': SiJavascript,
    'typescript': SiTypescript,
    'mongodb': SiMongodb,
    'express': SiExpress,
    'tailwind': SiTailwindcss,
    'nextjs': SiNextdotjs,
    'postgresql': SiPostgresql,
    'vite': SiVite,
    'redis': SiRedis,
    'prisma': SiPrisma,
    'docker': SiDocker,
    'aws': SiAmazon,
    'vercel': SiVercel,
    'github-actions': SiGithubactions,
    'redux': SiRedux,
    'firebase': SiFirebase,
    'expo': SiExpo,
};

// Get icon component by name with optional color class
export function getIcon(iconName, colorClass = '') {
    const IconComponent = iconMap[iconName?.toLowerCase()];
    if (!IconComponent) {
        return <FaCode className={colorClass} />; // Default fallback
    }
    return <IconComponent className={colorClass} />;
}

// Color map for technologies
export const colorMap = {
    'react': 'text-blue-500',
    'nodejs': 'text-green-500',
    'python': 'text-blue-400',
    'git': 'text-orange-500',
    'figma': 'text-pink-500',
    'javascript': 'text-yellow-400',
    'typescript': 'text-blue-600',
    'mongodb': 'text-green-600',
    'express': 'text-gray-400',
    'tailwind': 'text-cyan-500',
    'nextjs': 'text-white',
    'postgresql': 'text-blue-600',
    'vite': 'text-purple-500',
    'redis': 'text-red-500',
    'prisma': 'text-gray-300',
    'docker': 'text-blue-400',
    'aws': 'text-orange-400',
    'vercel': 'text-white',
    'github-actions': 'text-gray-400',
    'redux': 'text-purple-400',
    'firebase': 'text-yellow-500',
    'expo': 'text-white',
};

// Get color for an icon
export function getIconColor(iconName) {
    return colorMap[iconName?.toLowerCase()] || 'text-gray-400';
}
