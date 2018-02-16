import { call, put } from 'redux-saga/effects';
import AdAction from '../Redux/AdRedux';

export function* listAds(api, action) {
  const response = yield call(api.listAds, action.token, action.params);
  if (response.ok) {
    yield put(AdAction.listAdsSuccess(response.data));
  } else {
    yield put(AdAction.adsError(response.data));
  }
}

export function* addAd(api, action) {
  const response = yield call(api.createAd, action.token, action.ad);
  if (response.ok) {
    yield put(AdAction.addAdSuccess(response.data));
  } else {
    yield put(AdAction.adsError(response.data));
  }
}

export function* getAd(api, action) {
  const response = yield call(api.getAd, action.token, action.id);
  if (response.ok) {
    yield put(AdAction.getAdSuccess(response.data));
  } else {
    yield put(AdAction.adsError(response.data));
  }
}

export function* saveAd(api, action) {
  const response = yield call(api.saveAd, action.token, action.ad);
  if (response.ok) {
    yield put(AdAction.saveAdSuccess(response.data));
  } else {
    yield put(AdAction.adsError(response.data));
  }
}

