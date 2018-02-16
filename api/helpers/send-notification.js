const axios = require('axios');

module.exports = {
  friendlyName: 'Send notification',
  description: '',

  inputs: {
    device: {
      type: 'string',
      example: 'dfdsafafds',
      description: 'User device',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    body: {
      type: 'string',
      required: true,
    },
    priority: {
      defaultsTo: 'high',
      type: 'string',
    },
    eventID: {
      type: 'number',
      required: true,
    },
    ttl: {
      type: 'number',
      defaultsTo: 60,
    },
  },

  exits: {

  },

  fn: (inputs, exits) => {
    const data = {
      to: inputs.device,
      priority: inputs.priority,
      time_to_live: inputs.ttl,
      notification: {
        sound: 'default',
        color: '#9D1F5C',
        title: inputs.title,
        body: inputs.body,
      },
      data: {
        eventID: inputs.eventID,
      },
    };

    sails.log('data', data);

    axios.post('https://fcm.googleapis.com/fcm/send', data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${process.env.FCM_KEY}`,
        },
      },
    )
    .then((response) => {
      return exits.success(response.data);
    })
    .catch((error) => {
      return exits.error(error);
    });
    // All done.
  },
};

