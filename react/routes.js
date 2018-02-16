import {
  Main,
  LoginPage,
  MainPage,
  UserManagement,
  UserEdit,
  Events,
  EventEdit,
  Voting,
  VoteEdit,
  VoteResults,
  Ads,
  AdsEdit,
  Stats,
} from './Containers';


const checkLogin = (nextState, replace, isLoggedIn, isCredited, isAdmin) => {
  if (!isLoggedIn && !isCredited) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
  if (isAdmin === false) {
    replace({
      pathname: 'admin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default (isLoggedIn, isCredited, isAdmin) => ({
  path: '/',
  component: Main,
  indexRoute: {
    component: LoginPage,
  },
  childRoutes: [{
    path: 'admin',
    component: MainPage,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, true),
  },
  {
    path: 'users',
    component: UserManagement,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, isAdmin),
  },
  {
    path: 'users/edit/:id',
    component: UserEdit,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, isAdmin),
  },
  {
    path: 'events',
    component: Events,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, true),
  },
  {
    path: 'events/edit/:id',
    component: EventEdit,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, true),
  },
  {
    path: 'voting',
    component: Voting,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, isAdmin),
  },
  {
    path: 'voting/edit/:id',
    component: VoteEdit,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, isAdmin),
  },
  {
    path: 'voting/results/:id',
    component: VoteResults,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, isAdmin),
  },
  {
    path: 'ads',
    component: Ads,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, true),
  },
  {
    path: 'ads/edit/:id',
    component: AdsEdit,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, true),
  },
  {
    path: 'stats',
    component: Stats,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn, isCredited, isAdmin),
  },
  ],
});
