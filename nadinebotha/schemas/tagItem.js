import {BiShow as icon} from 'react-icons/bi'

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
        source: 'referenceTitle',
        maxLength: 100,
      },
      hidden:true,
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