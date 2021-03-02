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
        name: 'projectSubTitle',
        title: 'Sub title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'URL',
        type: 'slug',
        options: {
          source: 'projectTitle',
          maxLength: 100,
        },
      },
      {
        name: 'projectImages',
        title: 'Images',
        type: 'array',
        of: [{type: 'projectImage'}],
      },
      {
        name: 'projectText',
        title: 'Text',
        type: 'blockContent',
      },
      {
        title: 'Tags',
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