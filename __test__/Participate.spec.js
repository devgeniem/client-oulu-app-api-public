const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'event/1/participate';


it('POST /event/1/participate should require valid token', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});

it('POST /event/1/participate should add user to participants', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .expect('status', 200)
  .expect('json','amiparticipating', true)
  .then((res) => {
    expect(res.json.participants[0].username).toBe('testi');
  })
  .done(done);

});

it('DELETE /event/1/participate should require valid token', (done) => {
  frisby.del(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});

it('DELETE /event/1/participate should add user to participants', (done) => {
  frisby.del(`http://localhost:1337/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .expect('status', 200)
  .then((res) => {
    expect(res.json.amiparticipating).toBe(false);
    expect(res.json.participants.length).toBe(0);
  })
  .done(done);

});