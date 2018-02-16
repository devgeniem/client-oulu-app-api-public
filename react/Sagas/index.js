import { takeLatest } from 'redux-saga/effects';
import API from '../Services/api';

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux';
import { UserTypes } from '../Redux/UserRedux';
import { EventTypes } from '../Redux/EventRedux';
import { FileTypes } from '../Redux/FileRedux';
import { AdTypes } from '../Redux/AdRedux';
import { VotingTypes } from '../Redux/VotingRedux';
import { StatTypes } from '../Redux/StatRedux';

/* ------------- Sagas ------------- */

import { login } from './LoginSagas';
import { listUsers, getInfo, saveInfo, createUser, removeUser } from './UserSagas';
import { listEvents, createEvent, getEvent, saveEvent } from './EventSagas';
import { upload } from './FileSagas';
import { listAds, addAd, getAd, saveAd } from './AdSagas';
import { listVotes, addVote, getVote, saveVote, getResults } from './VotingSagas';
import { getStats } from './StatSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield [
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(UserTypes.LIST_REQUEST, listUsers, api),
    takeLatest(UserTypes.GET_INFO_REQUEST, getInfo, api),
    takeLatest(UserTypes.SAVE_INFO_REQUEST, saveInfo, api),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser, api),
    takeLatest(UserTypes.REMOVE_USER_REQUEST, removeUser, api),
    takeLatest(EventTypes.LIST_EVENTS_REQUEST, listEvents, api),
    takeLatest(EventTypes.CREATE_EVENT_REQUEST, createEvent, api),
    takeLatest(EventTypes.GET_EVENT_REQUEST, getEvent, api),
    takeLatest(EventTypes.SAVE_EVENT_REQUEST, saveEvent, api),
    takeLatest(FileTypes.UPLOAD, upload, api),
    takeLatest(AdTypes.LIST_ADS_REQUEST, listAds, api),
    takeLatest(AdTypes.ADD_AD_REQUEST, addAd, api),
    takeLatest(AdTypes.GET_AD_REQUEST, getAd, api),
    takeLatest(AdTypes.SAVE_AD_REQUEST, saveAd, api),
    takeLatest(VotingTypes.LIST_VOTES_REQUEST, listVotes, api),
    takeLatest(VotingTypes.ADD_VOTE_REQUEST, addVote, api),
    takeLatest(VotingTypes.GET_VOTE_REQUEST, getVote, api),
    takeLatest(VotingTypes.SAVE_VOTE_REQUEST, saveVote, api),
    takeLatest(VotingTypes.GET_RESULTS_REQUEST, getResults, api),
    takeLatest(StatTypes.GET_STATS_REQUEST, getStats, api),
  ];
}
