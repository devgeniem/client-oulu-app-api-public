/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';
import R from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  listEventsRequest: ['token', 'params'],
  listEventsSuccess: ['events'],
  createEventRequest: ['token', 'event'],
  createEventSuccess: ['event'],
  getEventRequest: ['token', 'id'],
  getEventSuccess: ['event'],
  saveEventRequest: ['token', 'event'],
  saveEventSuccess: ['event'],
  failure: ['error'],
});

export const EventTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  sync: true,
  error: null,
  events: [],
  event: null,
  saving: null,
};

/* ------------- Reducers ------------- */
export const listEventsRequest = (state, { token, params }) => {
  return R.merge(state, { fetching: true, error: null, event: null });
};
export const listEventsSuccess = (state, { events }) => {
  return R.merge(state, { fetching: false, error: null, events });
};

export const createEventRequest = (state, { token, event }) => {
  return R.merge(state, { adding: true, error: null, event: null });
};
export const createEventSuccess = (state, { event }) => {
  return R.merge(state, { adding: false, error: null, event });
};

export const getEventRequest = (state, { token, id }) => {
  return R.merge(state, { fetching: true, error: null, event: null });
};

export const getEventSuccess = (state, { event }) => {
  return R.merge(state, { fetching: false, error: null, event });
};

export const saveEventRequest = (state, { token, event }) => {
  return R.merge(state, { saving: true, error: null });
};

export const saveEventSuccess = (state, { event }) => {
  return R.merge(state, { saving: false, error: null, event });
};

export const failure = (state, { error }) => {
  return R.merge(state, { adding: false, fetching: false, saving: false, error });
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_EVENTS_REQUEST]: listEventsRequest,
  [Types.LIST_EVENTS_SUCCESS]: listEventsSuccess,
  [Types.CREATE_EVENT_REQUEST]: createEventRequest,
  [Types.CREATE_EVENT_SUCCESS]: createEventSuccess,
  [Types.GET_EVENT_REQUEST]: getEventRequest,
  [Types.GET_EVENT_SUCCESS]: getEventSuccess,
  [Types.SAVE_EVENT_REQUEST]: saveEventRequest,
  [Types.SAVE_EVENT_SUCCESS]: saveEventSuccess,
  [Types.FAILURE]: failure,
});
