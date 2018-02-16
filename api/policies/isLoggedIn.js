/**
 * isLoggedIn
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how this policy works and how to use it, see:
 *   http://sailsjs.com/anatomy/api/policies/isLoggedIn.js
 */
export default (req, res, next) => {
  if (req.user.token) {
    return next();
  }
  // Otherwise, this request did not come from a logged-in user.
  return res.status(401).json({ error: '', message: '' });
};
