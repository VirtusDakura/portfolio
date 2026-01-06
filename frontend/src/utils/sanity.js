import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
    projectId: '6ajwuesb',
    dataset: 'production',
    useCdn: true, // Set to false for real-time data during development
    apiVersion: '2024-01-06', // Use today's date for the latest API version
});

// Image URL builder
const builder = imageUrlBuilder(client);

// Helper function to get image URLs from Sanity
export function urlFor(source) {
    return builder.image(source);
}

// Fetch hero section data
export async function getHero() {
    const query = `*[_type == "hero"][0] {
    name,
    greeting,
    roles,
    bio,
    profileImage,
    resumeFile {
      asset-> {
        url
      }
    },
    socialLinks
  }`;
    return client.fetch(query);
}

// Fetch about section data
export async function getAbout() {
    const query = `*[_type == "about"][0] {
    title,
    subtitle,
    aboutImage,
    heading,
    paragraphs,
    stats,
    techStack
  }`;
    return client.fetch(query);
}

// Fetch all projects
export async function getProjects() {
    const query = `*[_type == "project"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    longDescription,
    image,
    technologies,
    github,
    demo,
    category,
    featured,
    order
  }`;
    return client.fetch(query);
}

// Fetch featured projects only
export async function getFeaturedProjects() {
    const query = `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    longDescription,
    image,
    technologies,
    github,
    demo,
    category,
    featured
  }`;
    return client.fetch(query);
}

// Fetch all skills/services
export async function getSkills() {
    const query = `*[_type == "skill"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    iconColor,
    technologies,
    gradientColor,
    order
  }`;
    return client.fetch(query);
}

// Fetch a single project by slug
export async function getProjectBySlug(slug) {
    const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    longDescription,
    image,
    technologies,
    github,
    demo,
    category,
    featured
  }`;
    return client.fetch(query, { slug });
}
