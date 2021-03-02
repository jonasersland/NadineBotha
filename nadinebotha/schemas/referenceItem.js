import {BiShow as icon} from 'react-icons/bi'

export default {
  name: 'referenceItem',
  title: 'References',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'referenceSubTitle',
      title: 'Sub title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'referenceTitle',
        maxLength: 100,
      },
    },
    {
      name: 'referenceImages',
      title: 'Images',
      type: 'array',
      of: [{type: 'referenceImage'}],
    },
    {
      name: 'referenceText',
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