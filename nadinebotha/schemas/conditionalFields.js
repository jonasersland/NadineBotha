import ConditionalFields from "../components/ConditionalFields"

export default {
  name: 'conditionalFields',
  title: 'Condition Fields Title',
  type: 'object',
  inputComponent: ConditionalFields,
  fields: [
    // First field is mandatory and needs to be a Boolean with the name: `conditionalsToggled`
    {
        name: 'conditionalsToggled',
        title: 'Call To Action',
        type: 'boolean'
    },
    // Example of a Call To Action Button with a title and url field
    {
       name: 'callToActionTitle',
       title: 'Button Title',
       type :'string'
     }, 
    { 
       name: 'callToActionUrl',
       title: 'Button Url',
       type: 'url'
     }
  ]
}