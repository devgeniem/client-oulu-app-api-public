const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'user/device';

it('POST /user/device should require logged in user', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});

it('POST /user/device should require device id', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`,{
    body: {},
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .expect('status', 400)
    .done(done);
});

it('POST /user/device should return user with new device', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`,{
    body: {
      deviceid
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(data => {
  })
    .expect('json', 'deviceid', deviceid)
    .expect('json', 'active', true)
    .expect('status', 200)
    .done(done);
});


it('DELETE /user/device should require logged in user', (done) => {
  frisby.del(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});

/*
it('DELETE /user/device should require device id', (done) => {
  frisby.fetch(`http://localhost:1337/api/${endpoint}`,{
    body: {},
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .expect('status', 200)
    .done(done);
});

*/
