export const schema = {
  title: "Countdown Container",
  description: "Countdown Container - Configuração",
  type: "object",
  properties: {
    countdownTitle: {
      title: "Título",
      type: "string",
    },
    countdownSubTitle: {
      title: "Subtítulo",
      type: "string",
    },
    imageDesktop: {
      type: 'string',
      title: 'Image Desktop',
      default: '',
      description: 'Paste the URL',
      widget: {
        "ui:widget": "image-uploader"
     }
    },
    imageDesktopLink: {
      type: 'string',
      title: 'Image Desktop Link',
      default: '',
      description: 'Paste the URL',
    },
    isActive: {
      title: "Ativar vitrine",
      type: "boolean",
      default: true,
    },
  },
};

export const defaultProps = {
  countdownTitle: "Countdown",
  countdownSubTitle: "Subtitle",
  countdownDate: "25/12/2022",
  countdownHour: "00:00",
  imageDesktop: "",
  isActive: true,
};
