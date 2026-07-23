import { defineType, defineField, defineArrayMember } from 'sanity'

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
            of: [defineArrayMember({ type: 'text' })],
            description: 'Add multiple paragraphs about yourself',
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'number', title: 'Number/Value', type: 'string' }),
                        defineField({ name: 'label', title: 'Label', type: 'string' }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'techStack',
            title: 'Technology Stack',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', title: 'Technology Name', type: 'string' }),
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Icon identifier (e.g., "react", "nodejs", "python", "postgresql", "docker")',
                        }),
                        defineField({
                            name: 'category',
                            title: 'Category',
                            type: 'string',
                            description: 'e.g., "Frontend", "Backend", "Database", "DevOps & Tools"',
                            options: {
                                list: [
                                    { title: 'Frontend', value: 'Frontend' },
                                    { title: 'Backend', value: 'Backend' },
                                    { title: 'Database', value: 'Database' },
                                    { title: 'DevOps & Tools', value: 'DevOps & Tools' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'sublabel',
                            title: 'Sublabel / Role',
                            type: 'string',
                            description: 'e.g., "UI Library", "Relational DB", "Containerization"',
                        }),
                        defineField({ name: 'color', title: 'Icon Color', type: 'string', description: 'e.g., "text-blue-500"' }),
                    ],
                }),
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

