/* eslint-disable no-param-reassign */

export default {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    desc: {
      type: 'string',
    },
    picture: {
      type: 'string',
    },
    advertiser: {
      type: 'string',
    },
    publishDate: {
      type: 'number',
      columnType: 'bigint(20)',
    },
    expireDate: {
      type: 'number',
      columnType: 'bigint(20)',
      required: true,
    },
    showDates: {
      type: 'boolean',
    },
    link: {
      type: 'string',
    },
    cat: {
      type: 'string',
    },
    adtype: {
      type: 'string',
      isIn: ['sponsored', 'announcement'],
      defaultsTo: 'sponsored',
    },
    creator: {
      model: 'User',
    },
    modifier: {
      model: 'User',
    },
  },
};
