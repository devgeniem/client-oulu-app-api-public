export default {

  login: (req, res) => {
    const params = req.allParams();

    if (!params.username || !params.password) {
      sails.log('missing username and password');
      return res.status(400).json({ error: 'error_201', message: 'Nick and password required' });
    }
    const username = params.username;

    return User.findOne({ username })
      .populate('participations')
      .populate('events')
      .then((user) => {
        if (!user) {
          sails.log('User not found');
          return res.status(401).json({ error: 'error_202', message: 'Invalid username or password' });
        }

        if (UserService.comparePassword(user.password, params.password)) {
          return res.status(200).json({
            user,
            token: TokenService.issue({
              user: {
                id: user.id,
                userlevel: user.userlevel,
              },
            }),
          });
        }
        sails.log('Invalid username or password');
        return res.status(401).json({ key: 'error_202', text: 'Invalid username or password' });
      })
      .catch(res.serverError);
  },

  logout: (req, res) => {
    if (req.session) {
      req.session.destroy();
    }
    res.status(200).json({ message: 'ok' });
  },
};
