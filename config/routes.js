/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/docs': {
    view: 'docs',
  },
  'POST /api/session': 'SessionController.saveSession',
  'POST /api/imageupload': 'FileController.uploadImage',
  'GET /api/me': {
    controller: 'UserController',
    action: 'getUserInfo',
    skipAssets: true,
  },
  'POST /api/me': {
    controller: 'UserController',
    action: 'updateUserInfo',
    skipAssets: true,
  },
  'GET /api/user/:id': {
    controller: 'UserController',
    action: 'findUser',
    skipAssets: true,
  },
  'POST /api/user/:id': {
    controller: 'UserController',
    action: 'updateUser',
    skipAssets: true,
  },
  'DELETE /api/user/:id': {
    controller: 'UserController',
    action: 'removeUser',
    skipAssets: true,
  },
  'GET /api/user': {
    controller: 'UserController',
    action: 'listUsers',
    skipAssets: true,
  },
  'POST /api/user': {
    controller: 'UserController',
    action: 'addUser',
    skipAssets: true,
  },
  'POST /api/user/device': {
    controller: 'DeviceController',
    action: 'activateDevice',
    skipAssets: true,
  },
  'DELETE /api/user/device': {
    controller: 'DeviceController',
    action: 'deactivateDevice',
    skipAssets: true,
  },
  'POST /api/anonuser': {
    controller: 'UserController',
    action: 'addAnonUser',
    skipAssets: true,
  },
  'POST /api/login': 'LoginController.login',
  'GET /api/logout': 'LoginController.logout',
  'POST /api/event': 'EventController.createEvent',
  'GET /api/event': 'EventController.listEvents',
  'GET /api/event/:id': {
    controller: 'EventController',
    action: 'getEvent',
    skipAssets: true,
  },
  'POST /api/event/:id': {
    controller: 'EventController',
    action: 'updateEvent',
    skipAssets: true,
  },
  'POST /api/event/:event/participate': {
    controller: 'EventController',
    action: 'addParticipation',
    skipAssets: true,
  },
  'DELETE /api/event/:event/participate': {
    controller: 'EventController',
    action: 'removeParticipation',
    skipAssets: true,
  },
  'DELETE /api/event/:id': {
    controller: 'EventController',
    action: 'removeEvent',
    skipAssets: true,
  },

  'POST /api/ad': {
    controller: 'AdController',
    action: 'createAd',
    skipAssets: true,
  },
  'GET /api/ad': {
    controller: 'AdController',
    action: 'list',
    skipAssets: true,
  },
  'GET /api/ad/:id': {
    controller: 'AdController',
    action: 'getAd',
    skipAssets: true,
  },
  'POST /api/ad/:id': {
    controller: 'AdController',
    action: 'updateAd',
    skipAssets: true,
  },
  'GET /api/voting': {
    controller: 'VoteController',
    action: 'listPolls',
    skipAssets: true,
  },
  'POST /api/voting': {
    controller: 'VoteController',
    action: 'addPoll',
    skipAssets: true,
  },
  'GET /api/voting/:id': {
    controller: 'VoteController',
    action: 'getPoll',
    skipAssets: true,
  },
  'POST /api/voting/:id': {
    controller: 'VoteController',
    action: 'updatePoll',
    skipAssets: true,
  },
  'GET /api/votingresult/:id': {
    controller: 'VoteController',
    action: 'getPollResults',
    skipAssets: true,
  },
  'POST /api/votingresult/:id': {
    controller: 'VoteController',
    action: 'postPollResult',
    skipAssets: true,
  },
  'GET /api/stats': {
    controller: 'StatsController',
    action: 'getStats',
    skipAssets: true,
  },
};
