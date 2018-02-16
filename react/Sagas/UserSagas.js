import { call, put } from 'redux-saga/effects';
import UserActions from '../Redux/UserRedux';

export function* listUsers(api, action) {
  const { token, params } = action;
  const response = yield call(api.listUsers, token, params);

  if (response.ok) {
    const users = response.data;
    yield put(UserActions.listSuccess(users));
  } else {
    const error = response.data;
    yield put(UserActions.listFailure(error));
  }
}

export function* getInfo(api, action) {
  const { token, id } = action;
  const response = yield call(api.getUser, token, id);
  if (response.ok) {
    yield put(UserActions.getInfoSuccess(response.data));
  } else {
    yield put(UserActions.getInfoFailure(response.data));
  }
}

export function* saveInfo(api, action) {
  const { token, user } = action;
  const response = yield call(api.saveUser, token, user);
  if (response.ok) {
    yield put(UserActions.saveInfoSuccess(response.data));
  } else {
    yield put(UserActions.saveInfoFailure(response.data));
  }
}


export function* createUser(api, action) {
  const { token, user } = action;
  const response = yield call(api.createUser, token, user);
  if (response.ok) {
    yield put(UserActions.createUserSuccess(response.data));
  } else {
    yield put(UserActions.createUserFailure(response.data));
  }
}

export function* removeUser(api, action) {
  const { token, id } = action;
  const response = yield call(api.removeUser, token, id);
  if (response.ok) {
    yield put(UserActions.createUserSuccess(response.data));
  } else {
    yield put(UserActions.createUserFailure(response.data));
  }
}
