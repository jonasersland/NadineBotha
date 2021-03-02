import {BiPurchaseTagAlt as icon} from 'react-icons/bi'

export default {
  name: 'tagItem',
  title: 'Tags',
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
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'referenceText',
      title: 'Text',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}