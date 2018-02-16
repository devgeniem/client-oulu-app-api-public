const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'user'

it('GET /user/1 should require logged in user', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}/1`)
    .expect('status', 401)
    .done(done);
});

it('GET /user/1 should return user infomation', (done) => {
  frisby.post(`http://localhost:1337/api/login`, credentials)
  .then((res) => {
    const id = res.body.user.id;
    return frisby.get(`http://localhost:1337/api/${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${res.body.token}`
      }
    })
    .expect('status', 200)
    .expect('json', 'username', credentials.user)
    .expect('json', 'id', id)
    .expect('json', 'email')
    .expect('json', 'userlevel')
    .expect('json', 'active')
  })
  .done(done);
});


it('GET /user should require login', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});

it('GET /user should list users', (done) => {
  frisby.post(`http://localhost:1337/api/login`, credentials)
  .then((res) => {
    return frisby.get(`http://localhost:1337/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${res.body.token}`
      }
    })
    .expect('status', 200)
    .expect('jsonTypes', '*', {
      username: Joi.string().required(),
      id: Joi.number().required(),
    })
  })
  .done(done);
});


it('POST /user/ should require logged in user', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});


it('POST /user/[id] should require logged in user', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}/4`)
    .expect('status', 401)
    .done(done);
});


it('POST /user/[id] should return new values', (done) => {
  frisby.post(`http://localhost:1337/api/login`, credentials)
    .then((res) => {
      const id = res.body.user.id;
      const date = new Date().getTime();

      return frisby.post(`http://localhost:1337/api/${endpoint}/${id}`,
      {
        body: {
          searchParameters: date
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .expect('status', 200)
      .expect('json', 'username', credentials.user)
      .expect('json', 'id', id)
      .expect('json', 'searchParameters', date)
      .expect('json', 'email')
      .expect('json', 'userlevel')
      .expect('json', 'active')
    })
    .done(done);
  });