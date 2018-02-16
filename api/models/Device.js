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
      defaultsTo: true,
    },
    user: {
      model: 'User',
    },
  },

};
