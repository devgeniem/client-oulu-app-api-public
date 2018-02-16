/* eslint-disable global-require */


export default {
  lang: require('./LangRedux').reducer,
  login: require('./LoginRedux').reducer,
  usermanagement: require('./UserRedux').reducer,
  events: require('./EventRedux').reducer,
  file: require('./FileRedux').reducer,
  ads: require('./AdRedux').reducer,
  voting: require('./VotingRedux').reducer,
  stats: require('./StatRedux').reducer,
};
