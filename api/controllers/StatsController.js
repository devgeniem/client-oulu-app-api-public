const { forEach } = require('p-iteration');
const R = require('ramda');

const sortByResultCount = R.sortBy(R.prop('resultCount'));
const sortByParticipantCount = R.sortBy(R.prop('participants'));

export default {

  /*
  - Kuinka monta käyttäjää on
- Kuinka monta tapahtumaa on luotu
- Kuinka monta osallistujaa tapahtumissa on keskimäärin
- Top 10 tapahtumaa osallistujien sekaan.
- Kuinka monta kyselyä on luotu
- Top 10 vastatut kyselyt

   */
  async getStats(req, res) {
    console.log('get stats');
    const result = {
      users: {
        registeredCount: null,
        anonymousCount: null,
      },
      events: {
        totalCount: null,
        averageParticipants: null,
        topEvents: [],
      },
      votes: {
        votesCount: null,
        topVotes: [],
      },
    };
    // User counts
    const usersCount = await User.count();
    result.users.registeredCount = usersCount;
    const anonCount = await AnonUser.count();
    result.users.anonymousCount = anonCount;

    // Event counts
    let events = await Event.find()
    .populate('participants')
    .populate('anonparticipants');
    result.events.totalCount = events.length;
    let totalParticipants = 0;

    events.forEach((event, index) => {
      totalParticipants += event.participants.length;
      totalParticipants += event.anonparticipants.length;
      events[index].participants = event.participants.length + event.anonparticipants.length;
    });

    const averageParticipants = totalParticipants / events.length;
    result.events.averageParticipants = averageParticipants;
    sails.log('total', totalParticipants);
    sails.log('average', averageParticipants);
    events = sortByParticipantCount(events);
    events = R.reverse(events);
    result.events.topEvents = events;

    // Vote counts
    let votes = await Voting.find();
    result.votes.votesCount = votes.length;

    await forEach(votes, async (vote, index) => {
      const resultCount = await VotingResult.count({ voteid: vote.id });
      votes[index].resultCount = resultCount;
    });
    votes = sortByResultCount(votes);
    votes = R.reverse(votes);
    result.votes.topVotes = votes;

    return res.status(200).json(result);
  },
};
