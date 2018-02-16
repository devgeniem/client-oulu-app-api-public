/*
  Here is the main react application used in react-based views.
  This is used in urls defined by routes.js and initialized in
  config/http.js middleware.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import { I18nextProvider } from 'react-i18next';
import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga';
import getI18n from './Services/i18n';
import routes from './routes';
import reducers from './Redux';
import rootSaga from './Sagas';

import '../assets/styles/reactapp.scss';

export default class App extends React.Component {

  static defaultProps = {
    state: {},
    req: {},
  }

  constructor(props) {
    super(props);
    if (process.browser) {
      this.initStoreClientSide();
    } else {
      this.initStoreServerSide();
    }
  }

  getSyncData() {
    const storeData = this.store.getState();
    const syncData = {};
    Object.keys(storeData).forEach((key) => {
      if (storeData[key].sync) {
        syncData[key] = storeData[key];
      }
    });
    return syncData;
  }

  initStoreClientSide() {
    const io = sailsIOClient(socketIOClient);
    const sagaMiddleware = createSagaMiddleware();
    const preloadedState = window.PRELOADED_STATE;
    delete window.PRELOADED_STATE;

    this.store = createStore(
      combineReducers({ ...reducers, routing: routerReducer }),
      preloadedState,
      compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
      ),
    );

    this.history = syncHistoryWithStore(browserHistory, this.store);

    // kick off root saga
    sagaMiddleware.run(rootSaga);

    // keep server session in sync with store
    this.store.subscribe(() => {
      const syncData = this.getSyncData();
      if (syncData) {
        io.socket.post('/api/session', { state: syncData }, (body, JWR) => {
          if (JWR.statusCode !== 200) {
            // console.error('Failed to save session state: ', JWR.statusCode);
          }
        });
      }
    });
  }

  initStoreServerSide() {
    const memoryHistory = createMemoryHistory(this.props.req.url);

    const sagaMiddleware = createSagaMiddleware();

    this.store = createStore(
      combineReducers({ ...reducers, routing: routerReducer }),
      this.props.state,
      applyMiddleware(sagaMiddleware),
    );

    this.history = syncHistoryWithStore(memoryHistory, this.store);

    // kick off root saga
    sagaMiddleware.run(rootSaga);
  }

  render() {
    const state = this.store.getState();
    let isLoggedIn = false;
    let isCredited = false;
    let isAdmin = false;
    if (state.login.user !== null) {
      isLoggedIn = state.login.token !== null;
      isCredited = state.login.user.userlevel >= 2;
      isAdmin = state.login.user.userlevel === 3;
    }

    const currentLanguage = state.lang.lang;
    return (
      <I18nextProvider i18n={getI18n(currentLanguage)}>
        <Provider store={this.store}>
          <Router onUpdate={() => window.scrollTo(0, 0)} history={this.history} routes={routes(isLoggedIn, isCredited, isAdmin)} />
        </Provider>
      </I18nextProvider>
    );
  }
}

if (process.browser) {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );
} else {
  module.exports = App;
}
