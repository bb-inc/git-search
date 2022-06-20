import { put, call, takeEvery } from 'redux-saga/effects';

import { fetchReposError, fetchReposRequest, fetchReposSuccess, fetchReposSuccessPage } from '.';
import { APIFetchRepos, APIFetchReposPage } from '../Api/Api';
import { FETCH_REPOS, FETCH_REPOS_PAGE } from './actionTypes';

function* fetchReposWorker(action) {
    yield put(fetchReposRequest);
    try {
        if (action.payload === '') {
            action.payload = 'stars:%3E1';
        }
        let result = yield call(APIFetchRepos, action.payload, action.currentPage, action.perPage);
        yield put(fetchReposSuccess(result));
    } catch (error) {
        yield put(fetchReposError(error));
    }
}

function* fetchReposInfoWorker(action) {
    yield put(fetchReposRequest);
    try {
        let result = yield call(APIFetchReposPage, action.repo, action.user);
        yield put(fetchReposSuccessPage(result));
    } catch (error) {
        yield put(fetchReposError(error));
    }
}

export function* rootSaga() {
    yield takeEvery(FETCH_REPOS, fetchReposWorker);
    yield takeEvery(FETCH_REPOS_PAGE, fetchReposInfoWorker);
}