const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'votingresult';

it('GET /votingresult should get poll results', (done) => {
  frisby.get(`http://localhost:1337/api/voting`)
    .then(data => {
      const id = data.json[0].id;
      const polls = data.json[0].poll.length;
      return frisby.get(`http://localhost:1337/api/${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(data2 => {
        expect(data2.json.questions.length).toBe(polls);
      })
      .expect('status', 200)
      .expect('json', 'totalCount')
      .expect('json', 'title')

    })
    .done(done);
});