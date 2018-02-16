module.exports = {


  friendlyName: 'Find user',


  description: 'Find user with given id.',


  inputs: {
    userId: {
      friendlyName: 'User id',
      description: 'User id',
      type: 'number',
      defaultsTo: null,
    },
  },


  exits: {
    userNotFound: {
      description: 'Could not find user',
    },
  },


  fn: (inputs, exits) => {
    User.findOne({ id: inputs.userId })
    .meta({ fetch: true })
    .populate('participations')
    .populate('events')
    .populate('devices')
    .then((user) => {
      return exits.success(user);
    })
    .catch(e => exits.userNotFound(e));
    // All done.
  },
};

