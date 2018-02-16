/* eslint-disable no-param-reassign */

export default {
  schema: true,
  attributes: {
    voteid: {
      model: 'Voting',
      required: true,
    },
    user: {
      model: 'User',
      required: true,
    },
    filledpoll: {
      type: 'json',
    },
  },
};
