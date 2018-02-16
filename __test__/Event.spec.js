const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'event';

it('GET /event should return an array of events', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .expect('status', 200)
    .expect('jsonTypes', '*', {
      'title': Joi.string().required(),
    })
    .done(done);
});

it('GET /event/1 should return an event', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}/1`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .expect('status', 200)
    .expect('json', 'title')
    .done(done);
});
