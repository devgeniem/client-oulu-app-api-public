/* eslint-disable no-param-reassign */

export default {
  schema: true,
  attributes: {
    creator: {
      model: 'User',
    },
    modifier: {
      model: 'User',
    },
    title: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      isIn: ['pending', 'published', 'removed'],
      required: true,
    },
    content_type: {
      type: 'string',
      isIn: ['event', 'announcements'],
      required: true,
    },
    desc: {
      type: 'string',
      columnType: 'longtext',
    },
    price: {
      type: 'string',
    },
    organiser: {
      type: 'string',
    },
    picture: {
      type: 'string',
    },
    cat: {
      type: 'string',
    },
    subcats: {
      type: 'json',
    },
    startDate: {
      type: 'number',
      columnType: 'bigint(20)',
    },
    endDate: {
      type: 'number',
      columnType: 'bigint(20)',
    },
    place: {
      type: 'string',
    },
    lat: {
      type: 'number',
      columnType: 'decimal(11,8)',
    },
    long: {
      type: 'number',
      columnType: 'decimal(11,8)',
    },
    participants: {
      collection: 'User',
      via: 'participations',
    },
    anonparticipants: {
      collection: 'AnonUser',
      via: 'participations',
    },
    polls: {
      collection: 'Voting',
      via: 'linkedEvent',
    },
  },


};
