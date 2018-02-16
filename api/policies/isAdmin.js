/**
 * isAdmin
 *
 * @description :: Policy to check if user is admin
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

export default (req, res, next) => {
  if (req.user.user && req.user.user.userlevel && req.user.user.userlevel === 3) {
    return next();
  }
  return res.status(401).json({ error: 'not_admin', message: 'User must be admin or superadmin to perform this action' });
};
