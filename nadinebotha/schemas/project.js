import {BiWorld as icon} from 'react-icons/bi'

export default {
    name: 'project',
    title: 'Projects',
    type: 'document',
    icon,
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'URL',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 100,
        },
        description: 'The unique string at the end of the URL. Click "generate" to generate this automatically.'
      },
      {
        name: 'text',
        title: 'Text',
        type: 'blockContent',
        required:false,
      },
      {
        title: 'Tags and references',
        name: 'referenceTags',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {type: 'tagItem'},
              {type: 'referenceItem'},
            ]
          }
        ],
        options: {
          editModal: 'popover',
        },
      }
    ],
    preview: {
      select: {
        title: 'title',
      },
    },
  }