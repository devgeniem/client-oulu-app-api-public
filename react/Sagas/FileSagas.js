import { call, put } from 'redux-saga/effects';
import FileActions from '../Redux/FileRedux';

export function* upload(api, action) {
  const response = yield call(api.uploadFile, action.token, action.uri, action.filetype);

  if (response.ok) {
    yield put(FileActions.uploadSuccess(response.data.status, response.data.uri));
  } else {
    yield put(FileActions.uploadError(response.data.status));
  }
}
