import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeLanguage: ['lang'],
});

export const LangTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  sync: true, // this state will be synced to server for serverside rendering
  lang: 'fi',
  error: null,
};

/* ------------- Reducers ------------- */

export const changeLanguage = (state, { lang }) =>
  R.merge(state, { lang });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_LANGUAGE]: changeLanguage,
});
