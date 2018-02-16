const frisby = require('frisby');
const Joi = frisby.Joi;

const endpoint = 'voting';

it('GET /voting should list polls', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`)
    .expect('status', 200)
    .expect('jsonTypes', '*', {
      'title': Joi.string().required(),
    })
    .done(done);
});


it('GET /voting/[id] should get poll information', (done) => {
  frisby.get(`http://localhost:1337/api/${endpoint}`)
  .then(data => {
    const id = data.json[0].id;
    return frisby.get(`http://localhost:1337/api/${endpoint}/${id}`)
    .expect('status', 200)
    .expect('json', 'title')
  })
  .done(done);
});