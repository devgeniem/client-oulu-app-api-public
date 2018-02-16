const R = require('ramda');

const sortByDate = R.sortBy(R.prop('startDate'));
const findByName = (username, array, field) => {
  if (R.findIndex(R.propEq(field, username))(array) > -1) {
    return true;
  }
  return false;
};
const calculateParticipants = (event, username) => {
  const calculated = event;

  calculated.amiparticipating = findByName(username, event.participants, 'id');
  if (!calculated.amiparticipating) {
    calculated.amiparticipating = findByName(username, event.anonparticipants, 'id');
  }
  calculated.participantCount = event.participants.length + event.anonparticipants.length;
  return calculated;
};
/*
 * UserController
 */
export default {

  /**
   * findUser
   */
  async createEvent(req, res) {
    const params = req.allParams();

    if (req.user.user.userlevel === 0) {
      return res.status(401).json({ error: 'error_201', message: 'Unable to create Event.' });
    }
    if (!params.startDate || !params.endDate) {
      return res.status(401).json({ error: '', message: 'Such errors. Missing event dates.' });
    }

    if (req.user.user.userlevel >= 2) {
      if (!params.status) {
        params.status = 'published';
      }
    } else {
      params.status = 'pending';
    }

    try {
      const event = await Event.create(params).fetch();
      const polls = [];
      event.polls = polls;
      return res.status(200).json(event);
    } catch (e) {
      return res.status(400).json({ e, error: 'error_201', message: 'Unable to create Event.' });
    }
  },

  getEvent: (req, res) => {
    const params = req.allParams();

    sails.helpers.findEvent({ eventId: params.id })
    .exec((err, event) => {
      if (err) { return res.status(400).json(err); }
      const newEvent = calculateParticipants(event, req.user.user.id);
      return res.status(200).json(newEvent);
    });
  },

  updateEvent: (req, res) => {
    const params = req.allParams();
    Event.update({ id: params.id }, params).meta({ fetch: true })
    .then(event => res.status(200).json(event[0]))
    .catch(e => res.status(400).json({ e, error: 'error_203', message: 'Unable to modfiy Event.' }));
  },

  async addParticipation(req, res) {
    const params = req.allParams();

    if (!params.event) {
      return res.status(400).json({ error: ' error', message: 'missing parameters' });
    }

    let participation;
    if (req.user.type === 'anon') {
      participation = 'anonparticipants';
    } else {
      participation = 'participants';
    }

    try {
      await Event.addToCollection(params.event, participation).members(req.user.user.id);
      return sails.helpers.findEvent({ eventId: params.event })
      .exec((err, event) => {
        if (err) { return res.status(400).json(err); }
        const newEvent = calculateParticipants(event, req.user.user.id);
        return res.status(200).json(newEvent);
      });
    } catch (e) {
      return res.status(400).json({ e, error: ' error_204', message: 'unable to save' });
    }
  },

  async removeParticipation(req, res) {
    const params = req.allParams();

    if (!params.event) {
      return res.status(400).json({ error: ' error', message: 'missing parameters' });
    }

    let participation;
    if (req.user.type === 'anon') {
      participation = 'anonparticipants';
    } else {
      participation = 'participants';
    }

    try {
      await Event.removeFromCollection(params.event, participation).members(req.user.user.id);
      return sails.helpers.findEvent({ eventId: params.event })
      .exec((err, event) => {
        if (err) { return res.status(400).json(err); }
        const newEvent = calculateParticipants(event, req.user.user.id);
        return res.status(200).json(newEvent);
      });
    } catch (e) {
      return res.status(400).json({ e, error: ' error_205', message: 'unable to remove' });
    }
  },

  removeEvent: (req, res) => {
    const params = req.allParams();

    Event.update({ id: params.id }, { status: 'removed' })
    .then(() => res.status(200).json({ message: 'Event removed.' }))
    .catch(e => res.status(400).json({ e, error: 'error_206', message: 'Unable to remove event.' }));
  },

  async listEvents(req, res) {
    const params = req.allParams();
    let listOld;
    if (params.listOld) {
      listOld = params.listOld;
    } else {
      listOld = false;
    }

    const searchparams = {
      where: { },
      limit: 1000,
      skip: 0,
    };

    // Paging parameters
    if (params.limit) {
      searchparams.limit = parseInt(params.limit, 10);
    }
    if (params.page) {
      searchparams.skip = (searchparams.limit * params.page) - searchparams.limit;
    }

    searchparams.where.status = 'published';

    if (params.status) {
      searchparams.where.status = params.status;
    }

    if (params.categories) {
      const categoriesArray = params.categories.split(',');
      searchparams.where.cat = {
        in: categoriesArray,
      };
    }

    if (params.from && params.to) {
      searchparams.where.startDate = { '>=': new Date(params.from), '<=': new Date(params.to) };
    }
    if (listOld === false) {
      searchparams.where.endDate = { '>=': new Date() };
    }
    sails.log.debug('params', searchparams);
    try {
      const result = await Event.find(searchparams)
      .populate('participants')
      .populate('anonparticipants')
      .populate('polls');
      let resultArray = result;

      if (params.search) {
        resultArray = resultArray.filter((row) => {
          if (row.title.toLowerCase().indexOf(params.search.toLowerCase()) > -1 || row.desc.toLowerCase().indexOf(params.search.toLowerCase()) > -1) {
            return row;
          }
          return false;
        });
      }

      if (params.subcategories) {
        const subcats = params.subcategories.split(',');
        resultArray = resultArray.filter((row) => {
          let returnRow = false;

          if (row.subcats) {
            subcats.forEach((param) => {
              row.subcats.forEach((rowvalue) => {
                if (param === rowvalue) {
                  returnRow = true;
                }
              });
            });
          }

          return returnRow;
        });
      }

      resultArray = resultArray.map((row) => {
        const newEvent = calculateParticipants(row, req.user.user.id);
        return newEvent;
      });

      resultArray = sortByDate(resultArray);
      return res.status(200).json(resultArray);
    } catch (e) {
      return res.status(400).json({ e, error: 'error_207', text: 'Unable to search events.' });
    }
  },

};
