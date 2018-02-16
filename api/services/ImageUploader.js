import sharp from 'sharp';

const Q = require('q');
const knox = require('knox');
const uuid = require('uuid');


const ImageUploader = function (options) {
  const deferred = Q.defer();
  const buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  return sharp(buf)
  .rotate()
  .resize(1080, 1080)
  .max()
  .toBuffer()
  .then((data) => {
    const knoxClient = knox.createClient({
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.BUCKET_NAME,
      region: process.env.AWS_REGION,
    });

    const filetype = options.filetype.replace('image/', '');
    const uid = uuid.v4();
    const filename = `${uid}.${filetype}`;

    // put to a path in our bucket, and make readable by the public
    const req = knoxClient.put(`images/${filename}`, {
      'Content-Length': data.length,
      'Content-Type': options.filetype,
      'x-amz-acl': 'public-read',
    });

    req.on('response', (res) => {
      if (res.statusCode === 200) {
        deferred.resolve(req.url);
      }
      deferred.reject({ error: 'true' });
    });

    req.end(data);

    return deferred.promise;
  })
  .catch((e) => {
    sails.log.error('error: ', e);
  });
};

module.exports = ImageUploader;
