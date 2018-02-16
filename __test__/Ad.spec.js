const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'ad';

it('GET /ad should require valid token', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});


it('GET /ad should list ads', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .expect('status', 200)
    .expect('jsonTypes', '*', {
      'title': Joi.string().required(),
      'desc': Joi.string().allow(''),
      'picture': Joi.string().allow('')
    })
    .done(done);
});


it('POST /ad should require valid token', (done) => {
  frisby.post(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 401)
    .done(done);
});
