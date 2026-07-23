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
    'react': 'text-blue-400',
    'nodejs': 'text-green-500',
    'python': 'text-sky-400',
    'git': 'text-orange-500',
    'figma': 'text-pink-400',
    'javascript': 'text-yellow-400',
    'typescript': 'text-blue-500',
    'mongodb': 'text-emerald-500',
    'express': 'text-zinc-300',
    'tailwind': 'text-cyan-400',
    'nextjs': 'text-white',
    'postgresql': 'text-blue-500',
    'vite': 'text-purple-400',
    'redis': 'text-red-500',
    'prisma': 'text-slate-200',
    'docker': 'text-sky-400',
    'aws': 'text-amber-500',
    'vercel': 'text-white',
    'github-actions': 'text-zinc-400',
    'redux': 'text-purple-400',
    'firebase': 'text-amber-400',
    'expo': 'text-white',
    'code': 'text-indigo-400',
    'server': 'text-indigo-400',
    'database': 'text-emerald-400',
    'cloud': 'text-blue-400',
};

// Get color for an icon
export function getIconColor(iconName) {
    return colorMap[iconName?.toLowerCase()] || 'text-indigo-400';
}

// Sublabel descriptors for technologies
export const techSublabels = {
    'react': 'UI Library',
    'nextjs': 'Full-Stack Framework',
    'typescript': 'Type-Safe JS',
    'javascript': 'ES6+ Engine',
    'tailwind': 'Utility-First CSS',
    'redux': 'State Management',
    'vite': 'Frontend Tooling',
    'nodejs': 'JS Server Runtime',
    'express': 'REST API Framework',
    'python': 'Scripting & APIs',
    'postgresql': 'Relational SQL DB',
    'mongodb': 'NoSQL Document Store',
    'redis': 'In-Memory Cache',
    'prisma': 'Type-Safe ORM',
    'docker': 'Containerization',
    'aws': 'Cloud Infrastructure',
    'git': 'Version Control',
    'vercel': 'Hosting & CI/CD',
    'figma': 'UI/UX Interface Design',
    'firebase': 'BaaS Platform',
    'expo': 'Cross-Platform Mobile',
    'server': 'Backend & Web APIs',
    'database': 'Data Persistence',
};

export function getTechSublabel(iconName, fallback) {
    if (fallback) return fallback;
    return techSublabels[iconName?.toLowerCase()] || 'Engineering Tool';
}

// Default domain category mapping fallback
export const techCategoryMap = {
    'react': 'Frontend',
    'nextjs': 'Frontend',
    'typescript': 'Frontend',
    'javascript': 'Frontend',
    'tailwind': 'Frontend',
    'redux': 'Frontend',
    'vite': 'Frontend',
    'expo': 'Frontend',
    'nodejs': 'Backend',
    'express': 'Backend',
    'python': 'Backend',
    'server': 'Backend',
    'firebase': 'Backend',
    'postgresql': 'Database',
    'mongodb': 'Database',
    'redis': 'Database',
    'prisma': 'Database',
    'database': 'Database',
    'docker': 'DevOps & Tools',
    'aws': 'DevOps & Tools',
    'git': 'DevOps & Tools',
    'vercel': 'DevOps & Tools',
    'figma': 'DevOps & Tools',
    'github-actions': 'DevOps & Tools',
    'code': 'Frontend',
};

export function getTechCategory(item) {
    if (item?.category) return item.category;
    const key = (item?.icon || item?.name)?.toLowerCase();
    return techCategoryMap[key] || 'DevOps & Tools';
}


// Brand glow styles for hover cards
export const brandGlowMap = {
    'react': 'hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:border-blue-500/50',
    'nextjs': 'hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-zinc-400/50',
    'typescript': 'hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:border-blue-600/50',
    'javascript': 'hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:border-yellow-500/50',
    'tailwind': 'hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-500/50',
    'redux': 'hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:border-purple-500/50',
    'vite': 'hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:border-purple-500/50',
    'nodejs': 'hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:border-green-500/50',
    'express': 'hover:shadow-[0_0_25px_rgba(161,161,170,0.25)] hover:border-zinc-500/50',
    'python': 'hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:border-sky-400/50',
    'postgresql': 'hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:border-blue-500/50',
    'mongodb': 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:border-emerald-500/50',
    'redis': 'hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] hover:border-red-500/50',
    'prisma': 'hover:shadow-[0_0_25px_rgba(148,163,184,0.25)] hover:border-slate-400/50',
    'docker': 'hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:border-sky-400/50',
    'aws': 'hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:border-amber-500/50',
    'git': 'hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:border-orange-500/50',
    'vercel': 'hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-zinc-400/50',
    'figma': 'hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:border-pink-500/50',
};

export function getBrandGlow(iconName) {
    return brandGlowMap[iconName?.toLowerCase()] || 'hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:border-indigo-500/50';
}

// Default Rich Tech Stack
export const DEFAULT_TECH_STACK = [
    // Frontend
    { name: 'React', icon: 'react', category: 'Frontend', sublabel: 'UI Library', color: 'text-blue-400' },
    { name: 'Next.js', icon: 'nextjs', category: 'Frontend', sublabel: 'Full-Stack Framework', color: 'text-white' },
    { name: 'TypeScript', icon: 'typescript', category: 'Frontend', sublabel: 'Type-Safe JS', color: 'text-blue-500' },
    { name: 'JavaScript', icon: 'javascript', category: 'Frontend', sublabel: 'ES6+ Engine', color: 'text-yellow-400' },
    { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend', sublabel: 'Utility Styling', color: 'text-cyan-400' },
    { name: 'Redux', icon: 'redux', category: 'Frontend', sublabel: 'State Management', color: 'text-purple-400' },
    { name: 'Vite', icon: 'vite', category: 'Frontend', sublabel: 'Frontend Tooling', color: 'text-purple-400' },

    // Backend
    { name: 'Node.js', icon: 'nodejs', category: 'Backend', sublabel: 'JS Runtime', color: 'text-green-500' },
    { name: 'Express', icon: 'express', category: 'Backend', sublabel: 'API Framework', color: 'text-zinc-300' },
    { name: 'Python', icon: 'python', category: 'Backend', sublabel: 'Scripting & APIs', color: 'text-sky-400' },
    { name: 'REST APIs', icon: 'server', category: 'Backend', sublabel: 'Web Services', color: 'text-indigo-400' },

    // Database
    { name: 'PostgreSQL', icon: 'postgresql', category: 'Database', sublabel: 'Relational SQL', color: 'text-blue-500' },
    { name: 'MongoDB', icon: 'mongodb', category: 'Database', sublabel: 'Document Store', color: 'text-emerald-500' },
    { name: 'Redis', icon: 'redis', category: 'Database', sublabel: 'In-Memory Cache', color: 'text-red-500' },
    { name: 'Prisma', icon: 'prisma', category: 'Database', sublabel: 'Type-Safe ORM', color: 'text-slate-200' },

    // DevOps & Tools
    { name: 'Docker', icon: 'docker', category: 'DevOps & Tools', sublabel: 'Containerization', color: 'text-sky-400' },
    { name: 'AWS', icon: 'aws', category: 'DevOps & Tools', sublabel: 'Cloud Infrastructure', color: 'text-amber-500' },
    { name: 'Git', icon: 'git', category: 'DevOps & Tools', sublabel: 'Version Control', color: 'text-orange-500' },
    { name: 'Vercel', icon: 'vercel', category: 'DevOps & Tools', sublabel: 'Hosting & CI/CD', color: 'text-white' },
    { name: 'Figma', icon: 'figma', category: 'DevOps & Tools', sublabel: 'UI/UX Design', color: 'text-pink-400' },
];

