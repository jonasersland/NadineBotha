export default {
    name: 'projectImage',
    title: 'Images',
    type: 'object',
    fields: [
        {
        name: 'image',
        title: 'Image file',
        type: 'image',
        },
      {
        name: 'caption',
        title: 'Image caption',
        type: 'blockContent',
      },
    ],
    preview: {
      select: {
        media: 'image',
        title: 'caption',
      },
    },
  }
  