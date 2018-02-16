/**
 * UserController
 */
export default {


  getUserInfo(req, res) {
    if (req.user.type === 'registered') {
      sails.helpers.findUser({ userId: req.user.user.id })
      .exec((err, user) => {
        if (err) { return res.status(400).json(err); }

        return res.status(200).json(user);
      });
    } else {
      sails.helpers.findAnonuser({ userId: req.user.user.id })
      .exec((err, user) => {
        if (err) { return res.status(400).json(err); }

        return res.status(200).json(user);
      });
    }
  },

  async updateUserInfo(req, res) {
    const params = req.allParams();
    const id = req.user.user.id;
    const newvalues = {};

    if (params.searchParameters !== '') {
      newvalues.searchParameters = params.searchParameters;
    }
    if (params.allowNotifications !== '') {
      newvalues.allowNotifications = params.allowNotifications;
    }

    if (req.user.type === 'registered') {
      try {
        sails.log('update registered', id, newvalues);

        const user = await User.update({ id }, newvalues).fetch();
        return res.status(200).json(user[0]);
      } catch (e) {
        return res.status(400).json(e);
      }
    } else {
      try {
        sails.log('update anon', id, newvalues);
        const anonuser = await AnonUser.update({ id }, newvalues).fetch();
        return res.status(200).json(anonuser[0]);
      } catch (e) {
        return res.status(400).json(e);
      }
    }
  },

  /**
   * findUser
   */
  findUser: (req, res) => {
    const params = req.allParams();

    sails.helpers.findUser({ userId: params.id })
    .exec((err, user) => {
      if (err) { return res.status(400).json({ error: 'error_101', message: 'Unable to find user' }); }

      return res.status(200).json(user);
    });
  },

  listUsers: (req, res) => {
    const params = req.allParams();

    User.find(params)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
  },

  addUser: (req, res) => {
    const params = req.allParams();

    User.create(params)
    .then(() => res.status(200).json({ message: 'User created' }))
    .catch(e => res.status(400).json({ e, error: 'error_103', message: 'Unable to create user.' }));
  },

  removeUser: (req, res) => {
    const params = req.allParams();

    User.update({ id: params.id }, { active: false })
    .then(() => {
      return res.status(200).json({ message: 'User removed' });
    })
    .catch(() => {
      return res.status(400).json({ message: 'User remove failed.', error: 'error_104' });
    });
  },

  updateUser: (req, res) => {
    const params = req.allParams();
    const newvalues = {};

    if (params.username !== '') {
      newvalues.username = params.username;
    }
    if (params.email !== '') {
      newvalues.email = params.email;
    }
    if (params.userlevel !== '') {
      newvalues.userlevel = params.userlevel;
    }
    if (params.gender !== '') {
      newvalues.gender = params.gender;
    }
    if (params.YOB !== '') {
      newvalues.YOB = params.YOB;
    }
    if (params.allowNotifications !== '') {
      newvalues.allowNotifications = params.allowNotifications;
    }
    if (params.searchParameters !== '') {
      newvalues.searchParameters = params.searchParameters;
    }

    return User.update({ id: params.id }, newvalues).meta({ fetch: true })
    .then((user) => {
      return res.status(200).json(user[0]);
    })
    .catch((e) => {
      return res.status(400).json({ e, error: 'error_105', message: 'User edit failed.' });
    });
  },

  addAnonUser: (req, res) => {
    const params = req.allParams();
    const newuser = {
      deviceid: params.deviceid,
      active: true,
    };

    AnonUser.findOrCreate({ deviceid: params.deviceid }, newuser)
    .exec((err, user, wasCreated) => {
      if (err) { return res.serverError(err); }

      if (wasCreated) {
        const createdUser = user;
        createdUser.participations = [];

        return res.status(200).json({
          user: createdUser,
          token: TokenService.issue({
            user: {
              id: user.id,
              userlevel: 0,
            },
          }),
        });
      }

      return sails.helpers.findAnonuser({ userId: user.id })
      .exec((finderr, founduser) => {
        if (finderr) { return res.status(400).json(finderr); }

        return res.status(200).json({
          user: founduser,
          token: TokenService.issue({
            user: {
              id: user.id,
              userlevel: 0,
            },
          }),
        });
      });
    });
  },

};
