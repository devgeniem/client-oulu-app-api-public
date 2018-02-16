module.exports = {


  friendlyName: 'Find event',


  description: 'Find single event.',


  inputs: {
    eventId: {
      friendlyName: 'Number of users',
      description: 'The maximum number of users to retrieve.',
      type: 'number',
      defaultsTo: null,
    },
  },


  exits: {
    eventNotFound: {
      description: 'Could not find event.',
    },
  },


  fn: (inputs, exits) => {
    Event.findOne({ id: inputs.eventId })
    .meta({ fetch: true })
    .populate('participants')
    .populate('anonparticipants')
    .populate('polls')
    .then((event) => {
      return exits.success(event);
    })
    .catch(e => exits.eventNotFound(e));
    // All done.
  },


};

