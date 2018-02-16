import { call, put } from 'redux-saga/effects';
import LoginActions from '../Redux/LoginRedux';

export function* login(api, action) {
  const { username, password } = action;

  const response = yield call(api.login, username, password);

  if (response.ok) {
    const user = response.data.user;
    const token = response.data.token;
    yield put(LoginActions.loginSuccess(user, token));
  } else {
    const error = response.data;
    yield put(LoginActions.loginFailure(error));
  }
}
