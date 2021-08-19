export default {
    name: 'referenceVideo',
    title: 'Video',
    type: 'object',
    fields: [
        {
            name: 'vimeoEmbed',
            title: 'Vimeo video URL',
            type: 'url',
            description: 'Paste the address to the Vimeo video. Example: "https://vimeo.com/183807595"',
          },
          {
            name: 'youTubeEmbed',
            title: 'YouTube video URL',
            type: 'url',
            description: 'Paste the address to the Youtube video. Example: "https://www.youtube.com/watch?v=haIjK1BFDAc"',
          },
          {
            title: "Video file",
            name: "video",
            type: "mux.video",
            description: 'Upload a video file',
          }
    ],
    preview: {
      select: {
        title: 'title',
      },
      prepare(title) {
        return {
          title: 'video'
        }
      }
    },
  }