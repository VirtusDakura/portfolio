import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Project Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'longDescription',
            title: 'Long Description',
            type: 'text',
            rows: 5,
            description: 'Detailed description shown in modal',
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Technology Name', type: 'string' },
                        { name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g., "react", "nodejs"' },
                        { name: 'color', title: 'Icon Color', type: 'string', description: 'e.g., "text-blue-500"' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'github',
            title: 'GitHub URL',
            type: 'url',
        }),
        defineField({
            name: 'demo',
            title: 'Live Demo URL',
            type: 'url',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Full-Stack', value: 'Full-Stack' },
                    { title: 'Frontend', value: 'Frontend' },
                    { title: 'Backend', value: 'Backend' },
                    { title: 'Mobile', value: 'Mobile' },
                    { title: 'Other', value: 'Other' },
                ],
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            category: 'category',
            featured: 'featured',
        },
        prepare({ title, media, category, featured }) {
            return {
                title: featured ? `⭐ ${title}` : title,
                subtitle: category,
                media,
            }
        },
    },
})
