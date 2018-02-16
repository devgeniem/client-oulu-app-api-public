/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['user', 'token'],
  loginFailure: ['error'],
  logout: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  sync: true, // this state will be synced to server for serverside rendering
  fetching: false,
  user: null,
  error: null,
};

/* ------------- Reducers ------------- */

/* Attempt to login */

export const loginRequest = (state, { username, password }) =>
  R.merge(state, { fetching: true, error: null });

/* Successfully logged in */
export const loginSuccess = (state, { user, token }) =>
  R.merge(state, { fetching: false, error: null, user, token });

/* Something went wrong with login */
export const loginFailure = (state, { error }) =>
  R.merge(state, { fetching: false, error });

export const logout = state => INITIAL_STATE;
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
});
