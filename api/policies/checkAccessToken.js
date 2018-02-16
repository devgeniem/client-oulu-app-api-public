/**
 * checkAccessToken
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

export default (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(401).json({ error: 'not_logged', message: 'Format is Authorization: Bearer [token]' });
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.status(401).json({ error: 'not_logged', message: 'No Authorization header was found' });
  }

  return TokenService.verify(token, (err, extractedData) => {
    if (err) return res.status(401).json({ error: 'not_logged', message: 'Invalid Token!' });
    req.user = extractedData; // Decrypted token payload (issued at AuthController)
    req.user.token = token;
    if (req.user.user.userlevel === 0) {
      req.user.type = 'anon';
    } else {
      req.user.type = 'registered';
    }

    sails.log('CurrentUser', req.user.user);
    return next();
  });
};
