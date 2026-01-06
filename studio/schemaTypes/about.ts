import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'about',
    title: 'About Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'About Me',
        }),
        defineField({
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'aboutImage',
            title: 'About Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'heading',
            title: 'Content Heading',
            type: 'string',
            description: 'e.g., "Crafting Digital Solutions with Passion"',
        }),
        defineField({
            name: 'paragraphs',
            title: 'About Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
            description: 'Add multiple paragraphs about yourself',
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'number', title: 'Number/Value', type: 'string' },
                        { name: 'label', title: 'Label', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'techStack',
            title: 'Technology Stack',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Technology Name', type: 'string' },
                        {
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Icon identifier (e.g., "react", "nodejs", "python")',
                        },
                        { name: 'color', title: 'Icon Color', type: 'string', description: 'e.g., "text-blue-500"' },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'aboutImage',
        },
    },
})
