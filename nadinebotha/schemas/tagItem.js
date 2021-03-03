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
      description: 'The unique string at the end of the URL. Click "generate" to generate this automatically.'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'An image is not required, but could be used for creating richer and more meaningful taxonomy pages.'

    },
    {
      name: 'referenceText',
      title: 'Text',
      type: 'blockContent',
      description: 'The same idea applies here – we have the option of adding some text in case we might want to use it later.'
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}