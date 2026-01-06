import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'skill',
    title: 'Skills / Services',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Skill Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Icon identifier (e.g., "code", "mobile", "server", "database", "cloud", "rocket")',
        }),
        defineField({
            name: 'iconColor',
            title: 'Icon Color',
            type: 'string',
            description: 'Tailwind color class (e.g., "text-blue-500")',
        }),
        defineField({
            name: 'technologies',
            title: 'Related Technologies',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'gradientColor',
            title: 'Gradient Color',
            type: 'string',
            description: 'Tailwind gradient (e.g., "from-blue-500 to-cyan-500")',
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
            title: 'title',
            subtitle: 'description',
        },
    },
})
