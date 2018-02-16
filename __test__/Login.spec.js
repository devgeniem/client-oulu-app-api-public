const frisby = require('frisby');

const endpoint = 'login';


it('POST /login should return user and token', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`, credentials)
    .expect('status', 200)
    .expect('json','user.username', 'admin')
    .expect('json', 'token')
    .done(done);
});

const endpoint2 = 'logout';

it('GET /logout should return ok', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint2}`)
    .expect('status', 200)
    .expect('json', 'message', 'ok')
    .done(done);
});