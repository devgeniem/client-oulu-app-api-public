/* eslint-disable no-param-reassign */

export default {
  schema: true,
  attributes: {
    deviceid: {
      type: 'string',
      required: true,
      unique: true,
    },
    active: {
      type: 'boolean',
    },
    allowNotifications: {
      type: 'boolean',
      defaultsTo: false,
    },
    searchParameters: {
      type: 'json',
    },
    participations: {
      collection: 'Event',
      via: 'anonparticipants',
    },
  },

  beforeCreate(user, next) {
    user.active = true;
    next();
  },

};
