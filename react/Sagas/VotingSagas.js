import { call, put } from 'redux-saga/effects';
import VotingActions from '../Redux/VotingRedux';

export function* listVotes(api) {
  const response = yield call(api.listVotes);

  if (response.ok) {
    const result = response.data;
    yield put(VotingActions.listVotesSuccess(result));
  } else {
    const error = response.data;
    yield put(VotingActions.votesError(error));
  }
}

export function* addVote(api, action) {
  const response = yield call(api.createVote, action.token, action.vote);

  if (response.ok) {
    const data = response.data;
    yield put(VotingActions.addVoteSuccess(data));
  } else {
    const error = response.data;
    yield put(VotingActions.votesError(error));
  }
}

export function* getVote(api, action) {
  const response = yield call(api.getVote, action.id);

  if (response.ok) {
    const vote = response.data;
    yield put(VotingActions.getVoteSuccess(vote));
  } else {
    const error = response.data;
    yield put(VotingActions.votesError(error));
  }
}

export function* saveVote(api, action) {
  const response = yield call(api.saveVote, action.token, action.vote);

  if (response.ok) {
    const vote = response.data;
    yield put(VotingActions.saveVoteSuccess(vote));
  } else {
    const error = response.data;
    yield put(VotingActions.votesError(error));
  }
}

export function* getResults(api, action) {
  const response = yield call(api.getVoteResults, action.token, action.id);

  if (response.ok) {
    const results = response.data;
    yield put(VotingActions.getResultsSuccess(results));
  } else {
    const error = response.data;
    yield put(VotingActions.votesError(error));
  }
}
