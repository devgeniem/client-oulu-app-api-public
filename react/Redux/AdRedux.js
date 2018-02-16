/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  listAdsRequest: ['token', 'params'],
  listAdsSuccess: ['ads'],
  addAdRequest: ['token', 'ad'],
  addAdSuccess: ['newad'],
  getAdRequest: ['token', 'id'],
  getAdSuccess: ['ad'],
  saveAdRequest: ['token', 'ad'],
  saveAdSuccess: ['ad'],
  adsError: ['error'],
});

export const AdTypes = Types;
export default Creators;


/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  error: null,
  fetching: false,
  adding: false,
  ads: [],
  ad: null,
  newad: null,
};

/* ------------- Reducers ------------- */


export const listAdsRequest = (state, { token, params }) => R.merge(state, { fetching: true, error: null, newad: null });
export const listAdsSuccess = (state, { ads }) => R.merge(state, { fetching: false, ads });

export const addAdRequest = (state, { token, ad }) => R.merge(state, { adding: true, error: null });
export const addAdSuccess = (state, { newad }) => R.merge(state, { adding: false, newad });

export const getAdRequest = (state, { token, id }) => R.merge(state, { fetching: true, error: null });
export const getAdSuccess = (state, { ad }) => R.merge(state, { fetching: false, ad });

export const saveAdRequest = (state, { token, ad }) => R.merge(state, { fetching: true, error: null });
export const saveAdSuccess = (state, { ad }) => R.merge(state, { fetching: false, ad });

export const error = (state, { e_message }) => R.merge(state, { fetching: false, adding: false, error: e_message });


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_ADS_REQUEST]: listAdsRequest,
  [Types.LIST_ADS_SUCCESS]: listAdsSuccess,
  [Types.ADD_AD_REQUEST]: addAdRequest,
  [Types.ADD_AD_SUCCESS]: addAdSuccess,
  [Types.GET_AD_REQUEST]: getAdRequest,
  [Types.GET_AD_SUCCESS]: getAdSuccess,
  [Types.SAVE_AD_REQUEST]: saveAdRequest,
  [Types.SAVE_AD_SUCCESS]: saveAdSuccess,
  [Types.ADS_ERROR]: error,
});
