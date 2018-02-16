const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'stats';


it('GET /stats should require valid token', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});


it('GET /stats should return stats object', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .expect('status', 200)
  .expect('json', 'users.registeredCount')
  .expect('json', 'users.anonymousCount')
  .expect('json', 'events.totalCount')
  .expect('json', 'events.averageParticipants')
  .expect('json', 'votes.votesCount')
  .then((res) => {
  })
  .done(done);

});