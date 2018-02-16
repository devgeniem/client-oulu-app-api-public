/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  listVotesRequest: [],
  listVotesSuccess: ['result'],
  addVoteRequest: ['token', 'vote'],
  addVoteSuccess: ['data'],
  getVoteRequest: ['id'],
  getVoteSuccess: ['vote'],
  saveVoteRequest: ['token', 'vote'],
  saveVoteSuccess: ['vote'],
  votesError: ['errormessage'],
  getResultsRequest: ['token', 'id'],
  getResultsSuccess: ['results'],
});

export const VotingTypes = Types;
export default Creators;


/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  error: null,
  fetching: false,
  list: [],
  adding: false,
  vote: null,
  saving: false,
  results: {},
};

/* ------------- Reducers ------------- */
export const listVotesRequest = state => R.merge(state, { fetching: true, error: null });
export const listVotesSuccess = (state, { result }) => R.merge(state, { fetching: false, error: null, list: result });

export const addVoteRequest = (state, { token, vote }) => {
  return R.merge(state, { adding: true, error: null });
};
export const addVoteSuccess = (state, { data }) => {
  return R.merge(state, { adding: false, error: null, vote: data });
};

export const getVoteRequest = (state, { id }) => R.merge(state, { fetching: true, vote: null, error: null });
export const getVoteSuccess = (state, { vote }) => R.merge(state, { fetching: false, vote, error: null });

export const saveVoteRequest = (state, { token, vote }) => R.merge(state, { saving: true, error: null });
export const saveVoteSuccess = (state, { vote }) => R.merge(state, { saving: false, error: null, vote });

export const getResultsRequest = (state, { token, id }) => R.merge(state, { fetching: true, error: null });
export const getResultsSuccess = (state, { results }) => R.merge(state, { fetching: false, results });

export const votesError = (state, { errormessage }) => R.merge(state, { fetching: false, adding: false, error: errormessage });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_VOTES_REQUEST]: listVotesRequest,
  [Types.LIST_VOTES_SUCCESS]: listVotesSuccess,
  [Types.ADD_VOTE_REQUEST]: addVoteRequest,
  [Types.ADD_VOTE_SUCCESS]: addVoteSuccess,
  [Types.GET_VOTE_REQUEST]: getVoteRequest,
  [Types.GET_VOTE_SUCCESS]: getVoteSuccess,
  [Types.SAVE_VOTE_REQUEST]: saveVoteRequest,
  [Types.SAVE_VOTE_SUCCESS]: saveVoteSuccess,
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.VOTES_ERROR]: votesError,
});
