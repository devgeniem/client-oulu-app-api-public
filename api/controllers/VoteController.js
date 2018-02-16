export default {

  getPoll: (req, res) => {
    const params = req.allParams();

    Voting.findOne({ id: params.id })
    .then((vote) => {
      res.status(200).json(vote);
    })
    .catch((e) => {
      sails.log.error('/api/voting/:id', e.code);
      sails.log.error('/api/voting/:id', e.details);
      res.status(400).json({ error: '', message: 'Vote not found.' });
    });
  },

  async addPoll(req, res) {
    const params = req.allParams();

    if (!params.title) {
      return res.status(400).json({ error: '', message: 'Vote title is required.' });
    }

    try {
      const result = await Voting.create({ title: params.title }).fetch();
      return res.status(200).json(result);
    } catch (e) {
      return res.status(400).json({ e, error: '', message: 'Vote add error' });
    }
  },

  updatePoll: (req, res) => {
    const params = req.allParams();

    if (params.title === '') {
      return res.status(400).json({ error: '', message: 'Vote title is required.' });
    }
    sails.log('edit poll', params);

    return Voting.update({ id: params.id }, params).meta({ fetch: true })
    .then((user) => {
      return res.status(200).json(user[0]);
    })
    .catch(e => res.status(400).json({ e, error: '', message: 'Vote save failed.' }));
  },


  listPolls: (req, res) => {
    const params = req.allParams();
    const searchparams = {};
    searchparams.active = 'true';

    if (params.listAll === 'true') {
      delete searchparams.active;
    }

    Voting.find(searchparams)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((e) => {
      res.status(400).json({ e, error: '', message: 'Vote list error' });
    });
  },

  async getPollResults(req, res) {
    const params = req.allParams();

    try {
      const vote = await Voting.findOne({ id: params.id });
      // count all results into question objects
      let questions = vote.poll;
      questions = questions.map((q) => {
        const newQ = q;
        if (q.type === 'bool') {
          newQ.trueCount = 0;
          newQ.falseCount = 0;
          return newQ;
        }
        newQ.valueCounts = {};
        for (let i = 1; i <= 6; i++) {
          const temp = q.data[`value${i}`];
          if (temp !== '') {
            newQ.valueCounts[`value${i}`] = 0;
          }
        }

        return newQ;
      });

      const results = await VotingResult.find({ voteid: params.id });

      results.forEach((fillItem) => {
        fillItem.filledpoll.forEach((row, index) => {
          if (row.type === 'bool') {
            questions[index][`${row.value}Count`] = questions[index][`${row.value}Count`] + 1;
          } else {
            questions[index].valueCounts[`${row.value}`] += 1;
          }
        });
      });
      const resultObject = {
        totalCount: results.length,
        title: vote.title,
        questions,
      };

      res.status(200).json(resultObject);
    } catch (err) {
      sails.log.error(err);
      res.status(400).json({ error: '', message: 'VoteResult list error' });
    }
  },

  async postPollResult(req, res) {
    const params = req.allParams();

    try {
      const vote = await Voting.findOne({ id: params.id });
      if (!vote) {
        return res.status(400).json({ error: '', message: 'VoteResult cant find vote.' });
      }
      if (params.answers.length !== vote.poll.length) {
        return res.status(400).json({ error: '', message: 'Missing answers.' });
      }

      vote.poll.forEach((item, index) => {
        vote.poll[index].value = params.answers[index];
      });

      const newresult = await VotingResult.create({
        voteid: params.id,
        user: req.user.user.id,
        filledpoll: vote.poll,
      }).fetch();

      return res.status(200).json(newresult);
    } catch (err) {
      sails.log.error(err);
      return res.status(400).json({ error: '', message: 'VoteResult save error' });
    }
  },
};
