const frisby = require('frisby');

const endpoint = 'me';
const currenttime = new Date().getTime();

it('GET /me/ should require valid token', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});

it('GET /me/ should return user information', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .expect('status', 200)
    .expect('json', 'email')
    .expect('json', 'username')
    .done(done);
});


it('POST /me/ should require valid token', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});

it('POST /me/ should return user with changed values', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`, {
    body:{
      allowNotifications: true,
      searchParameters: currenttime
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .expect('status', 200)
    .expect('json', 'allowNotifications', true)
    .expect('json', 'searchParameters', currenttime)
    .done(done);
});