/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * http://sailsjs.com/config/http
 */
const hook = require('css-modules-require-hook');
const sass = require('node-sass');

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename,
    }).css,
});

require('babel-core/register')();

var React = require('react');
// var express = require('express');
var ReactDOMServer = require('react-dom/server');
var reactRouter = require('react-router');
var addResView = require('sails/lib/hooks/views/res.view');
var Iso = require('iso').default;
var path = require('path');
var reactApp = React.createFactory(require('../react/app'));
var reactRoutes = require('../react/routes');

var match = reactRouter.match;

function reactView(req, res, next) {
  var viewData;
  var iso;
  var state = (req.session && req.session.state) ? req.session.state : {};
  var routes = reactRoutes(true);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    // couldnt match request url to react path
    if (error) {
      // 500
      return res.error();
    } else if (renderProps) {
      // 200
      var reactHtml = ReactDOMServer.renderToString(reactApp({ req: req, state: state }));
      iso = new Iso();
      iso.add(reactHtml, state);
      viewData = {
        title: 'OuluAdmin',
        reactHtml: iso.render(),
        state: JSON.stringify(state).replace(/</g, '\\u003c'),
      };

      viewData.versionNumber = process.env.npm_package_version;

      if (!res.view) {
        if (!req.options) req.options = {}; // add options to req otherwise addResView fails
        return addResView(req, res, () => res.view('react', viewData));
      }
      return res.view('react', viewData);
    }
    return next();
  });
}

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * http://sailsjs.com/documentation/concepts/middleware                      *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'requireHttps',
      'myRequestLogger',
      'www',
      'router',
      'reactView',
    ],

    reactView,

    myRequestLogger: (req, res, next) => {
      if (!/\..{2,5}$/.test(req.url)) {
        sails.log.debug('Requested :: ', req.method, req.url);
      }
      return next();
    },

    requireHttps: (req, res, next) => {
      if (req.get('host') !== 'localhost:1337') {
        if (req.headers['x-forwarded-proto'] !== undefined && req.headers['x-forwarded-proto'] === 'http') {
          return res.redirect('https://' + req.get('host') + req.url);
        }
      }

      return next();
    },

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * http://sailsjs.com/config/http#?customizing-the-body-parser              *
    *                                                                          *
    ***************************************************************************/

    bodyParser: (function _configureBodyParser() {
      const skipper = require('skipper');
      const middlewareFn = skipper({
        strict: true,
        limit: 10000000,
        parameterLimit: 10000,
      });
      return middlewareFn;
    })(),

  },

};
