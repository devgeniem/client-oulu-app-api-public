import { call, put } from 'redux-saga/effects';
import EventActions from '../Redux/EventRedux';

export function* listEvents(api, action) {
  const { params } = action;

  const response = yield call(api.listEvents, action.token, params);

  if (response.ok) {
    const events = response.data;
    yield put(EventActions.listEventsSuccess(events));
  } else {
    const error = 'error';
    yield put(EventActions.failure(error));
  }
}

export function* createEvent(api, action) {
  const response = yield call(api.createEvent, action.token, action.event);

  if (response.ok) {
    const event = response.data;
    yield put(EventActions.createEventSuccess(event));
  } else {
    const error = 'error';
    yield put(EventActions.failure(error));
  }
}

export function* getEvent(api, action) {
  const response = yield call(api.getEvent, action.token, action.id);

  if (response.ok) {
    yield put(EventActions.getEventSuccess(response.data));
  } else {
    const error = 'error';
    yield put(EventActions.failure(error));
  }
}

export function* saveEvent(api, action) {
  const response = yield call(api.saveEvent, action.token, action.event);
  if (response.ok) {
    yield put(EventActions.saveEventSuccess(response.data));
  } else {
    yield put(EventActions.failure(response.data));
  }
}
