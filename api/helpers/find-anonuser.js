module.exports = {
  friendlyName: 'Find anonuser',
  description: 'Find anonuser with given id.',

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
    AnonUser.findOne({ id: inputs.userId })
    .meta({ fetch: true })
    .populate('participations')
    .then((user) => {
      return exits.success(user);
    })
    .catch(e => exits.userNotFound(e));
    // All done.
  },
};

