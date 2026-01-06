import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Your Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'greeting',
            title: 'Greeting Text',
            type: 'string',
            description: 'e.g., "Hello, I\'m"',
        }),
        defineField({
            name: 'roles',
            title: 'Roles (for typing animation)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Add roles like "Full-Stack Developer", "Software Engineer"',
        }),
        defineField({
            name: 'bio',
            title: 'Short Bio',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'resumeFile',
            title: 'Resume PDF',
            type: 'file',
            options: {
                accept: '.pdf',
            },
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'github', title: 'GitHub URL', type: 'url' },
                { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
                { name: 'twitter', title: 'Twitter URL', type: 'url' },
                { name: 'email', title: 'Email Address', type: 'string' },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'profileImage',
        },
    },
})
