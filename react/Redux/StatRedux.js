/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getStatsRequest: ['token'],
  getStatsSuccess: ['stats'],
  getStatsError: ['error'],
});

export const StatTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  sync: true, // this state will be synced to server for serverside rendering
  stats: null,
  error: null,
  fetching: false,
};

/* ------------- Reducers ------------- */

export const getStatsRequest = (state, { token, params }) => {
  return R.merge(state, { fetching: true, error: null });
};

export const getStatsSuccess = (state, { stats }) => {
  return R.merge(state, { fetching: false, error: null, stats });
};

export const getStatsError = (state, { error }) => {
  return R.merge(state, { fetching: false, error });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_STATS_REQUEST]: getStatsRequest,
  [Types.GET_STATS_SUCCESS]: getStatsSuccess,
  [Types.GET_STATS_ERROR]: getStatsError,
});
