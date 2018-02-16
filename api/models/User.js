/* eslint-disable no-param-reassign */
const R = require('ramda');

export default {
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
    },
    email: {
      type: 'string',
      isEmail: true,
    },
    userlevel: {
      type: 'number',
      columnType: 'integer',
      isIn: [0, 1, 2, 3],
    },
    active: {
      type: 'boolean',
    },
    gender: {
      type: 'string',
      isIn: ['male', 'female'],
    },
    YOB: {
      type: 'number',
      columnType: 'integer',
    },
    devices: {
      collection: 'Device',
      via: 'user',
    },
    allowNotifications: {
      type: 'boolean',
    },
    searchParameters: {
      type: 'json',
    },
    participations: {
      collection: 'Event',
      via: 'participants',
    },
    events: {
      collection: 'Event',
      via: 'creator',
    },
  },

  beforeCreate(user, next) {
    // user is not active by default
    user.active = true;
    // Encrypt new password
    user.password = UserService.generatePasswordHash(user.password);
    next();
  },
  customToJSON() {
    // Return a shallow copy of this record with the password removed.
    return R.omit(['password'], this);
  },
};
