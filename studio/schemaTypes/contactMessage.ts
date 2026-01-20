import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactMessage',
    title: 'Contact Messages',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Sender Name',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'email',
            title: 'Sender Email',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'subject',
            title: 'Subject',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            rows: 5,
            readOnly: true,
        }),
        defineField({
            name: 'receivedAt',
            title: 'Received At',
            type: 'datetime',
            readOnly: true,
        }),
        defineField({
            name: 'read',
            title: 'Read',
            type: 'boolean',
            initialValue: false,
            description: 'Mark as read after reviewing',
        }),
    ],
    orderings: [
        {
            title: 'Newest First',
            name: 'receivedAtDesc',
            by: [{ field: 'receivedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'subject',
            subtitle: 'name',
            read: 'read',
            date: 'receivedAt',
        },
        prepare({ title, subtitle, read, date }) {
            const formattedDate = date ? new Date(date).toLocaleDateString() : '';
            return {
                title: read ? title : `🔴 ${title}`,
                subtitle: `${subtitle} • ${formattedDate}`,
            };
        },
    },
})
