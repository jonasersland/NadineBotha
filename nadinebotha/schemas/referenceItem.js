
import {BiIdCard as icon} from 'react-icons/bi'

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
      name: 'referenceType',
      title: 'Reference type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'referenceTypeImage' },
          { title: 'Text', value: 'referenceTypeText' },
          { title: 'Quote', value: 'referenceTypeQuote' },
          { title: 'Book', value: 'referenceTypeBook' },
          { title: 'Video', value: 'referenceTypeVideo' },
        ],
      },
      validation: Rule => Rule.required()
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
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
          {type: 'referenceImage'},
      ]
    },
    {
      title: 'Videos',
      name: 'videos',
      type: 'array',
      of: [
          {type: 'referenceVideo'},
      ]
    },
    {
      title: 'Tags or references',
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