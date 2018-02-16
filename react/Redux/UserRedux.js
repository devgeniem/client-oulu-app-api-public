/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  listRequest: ['token', 'params'],
  listSuccess: ['users'],
  listFailure: ['error'],
  getInfoRequest: ['token', 'id'],
  getInfoSuccess: ['user'],
  getInfoFailure: ['error'],
  saveInfoRequest: ['token', 'user'],
  saveInfoSuccess: ['user'],
  saveInfoFailure: ['error'],
  createUserRequest: ['token', 'user'],
  createUserSuccess: ['user'],
  createUserFailure: ['error'],
  removeUserRequest: ['token', 'id'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  sync: true, // this state will be synced to server for serverside rendering
  fetching: false,
  users: [],
  user: null,
  error: null,
  saved: false,
  created: false,
};

/* ------------- Reducers ------------- */


/* USERLIST */
export const listRequest = (state, { token, params }) => {
  return R.merge(state, { fetching: true, error: null });
};

/* Successfully logged in */
export const listSuccess = (state, { users }) =>
  R.merge(state, { fetching: false, error: null, users });

/* Something went wrong with login */
export const listFailure = (state, { error }) =>
  R.merge(state, { fetching: false, error });

/* USER INFO */
export const getInfoRequest = (state, { token, id }) => {
  return R.merge(state, { fetching: true, error: null, saved: false });
};

export const getInfoSuccess = (state, { user }) =>
  R.merge(state, { fetching: false, error: null, user });

export const getInfoFailure = (state, { error }) =>
  R.merge(state, { fetching: false, error });

/* SAVE USER INFO */
export const saveInfoRequest = (state, { token, user }) => {
  return R.merge(state, { fetching: true, error: null, saved: false });
};

export const saveInfoSuccess = (state, { user }) => {
  return R.merge(state, { fetching: false, error: null, user, saved: true });
};

export const saveInfoFailure = (state, { error }) =>
  R.merge(state, { fetching: false, error, saved: false });

/* CREATE USER */
export const createUserRequest = (state, { token, user }) => {
  return R.merge(state, { fetching: true, error: null, created: false });
};

export const createUserSuccess = (state, { user }) => {
  return R.merge(state, { fetching: false, error: null, user, created: true });
};

export const createUserFailure = (state, { error }) =>
  R.merge(state, { fetching: false, error, created: false });


export const removeUserRequest = (state, { token, id }) => {
  return R.merge(state, { fetching: true, error: null, created: false });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_REQUEST]: listRequest,
  [Types.LIST_SUCCESS]: listSuccess,
  [Types.LIST_FAILURE]: listFailure,
  [Types.GET_INFO_REQUEST]: getInfoRequest,
  [Types.GET_INFO_SUCCESS]: getInfoSuccess,
  [Types.GET_INFO_FAILURE]: getInfoFailure,
  [Types.SAVE_INFO_REQUEST]: saveInfoRequest,
  [Types.SAVE_INFO_SUCCESS]: saveInfoSuccess,
  [Types.SAVE_INFO_FAILURE]: saveInfoFailure,
  [Types.CREATE_USER_REQUEST]: createUserRequest,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserFailure,
  [Types.REMOVE_USER_REQUEST]: removeUserRequest,
});
