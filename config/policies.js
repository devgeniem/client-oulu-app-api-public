/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/isLoggedIn.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "isLoggedIn")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.com/docs/concepts/policies
 */


module.exports.policies = {
  '*': false,
  SessionController: {
    '*': true,
  },
  LoginController: {
    '*': true,
  },
  FileController: {
    '*': true,
  },
  VoteController: {
    '*': true,
    addPoll: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    updatePoll: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    listPolls: ['checkAccessToken'],
    getPoll: ['checkAccessToken'],
    getPollResults: ['checkAccessToken'],
    postPollResult: ['checkAccessToken'],
  },
  UserController: {
    '*': ['checkAccessToken', 'isLoggedIn'],
    listUsers: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    addUser: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    removeUser: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    updateUser: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    addAnonUser: true,
    getUserInfo: ['checkAccessToken'],
    updateUserInfo: ['checkAccessToken'],
  },
  EventController: {
    listEvents: ['checkAccessToken'],
    getEvent: ['checkAccessToken'],
    addParticipation: ['checkAccessToken'],
    removeParticipation: ['checkAccessToken'],
    createEvent: ['checkAccessToken', 'isLoggedIn'],
    updateEvent: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    removeEvent: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
  },
  AdController: {
    createAd: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
    list: ['checkAccessToken'],
    getAd: ['checkAccessToken'],
    updateAd: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
  },
  DeviceController: {
    activateDevice: ['checkAccessToken'],
    deactivateDevice: ['checkAccessToken'],
  },
  StatsController: {
    getStats: ['checkAccessToken', 'isLoggedIn', 'isAdmin'],
  },
};
