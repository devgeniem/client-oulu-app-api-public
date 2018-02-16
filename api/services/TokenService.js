/**
 * TokenService
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken
 */

import jwt from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET;

export default {

  // Generates a token from supplied payload
  issue(payload) {
    return jwt.sign(
      payload,
      tokenSecret,
      {
        expiresIn: '2y',
      },
    );
  },

  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(
      token,
      tokenSecret,
      {},
      callback,
    );
  },

};
