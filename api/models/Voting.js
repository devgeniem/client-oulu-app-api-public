/* eslint-disable no-param-reassign */

export default {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    organiser: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    active: {
      type: 'boolean',
      defaultsTo: false,
    },
    poll: {
      type: 'json',
    },
    linkedEvent: {
      model: 'Event',
    },
    pollType: {
      type: 'string',
      isIn: ['poll', 'questionnaire'],
      defaultsTo: 'poll',
    },
  },
};
