import { call, put } from 'redux-saga/effects';
import StatActions from '../Redux/StatRedux';

export function* getStats(api, action) {
  const { token } = action;
  const response = yield call(api.getStats, token);

  if (response.ok) {
    const stats = response.data;
    yield put(StatActions.getStatsSuccess(stats));
  } else {
    const error = response.data;
    yield put(StatActions.getStatsError(error));
  }
}
