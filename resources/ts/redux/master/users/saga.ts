import { all, call, fork, takeEvery, put } from 'redux-saga/effects'

import { MasterUserService } from '@/services/api/MasterUserService'
import {
    LOAD_MASTER_USERS,
    loadMasterUserSuccess,
    loadMasterUserError,
} from './action'

const loadMasterUsersAsync = async (params?: any, signal?: any) =>
    MasterUserService.List(params, signal)

function* loadMasterUser({ payload }) {
    try {
        const response = yield call(loadMasterUsersAsync, payload.params, payload.signal)
        yield put(loadMasterUserSuccess(response.data.data, response.data.meta))
    } catch (error: any) {
        yield put(loadMasterUserError(error?.message ?? 'Unknown error'))
    }
}

function* watchLoadMasterUser() {
    yield takeEvery<any>(LOAD_MASTER_USERS, loadMasterUser)
}

export default function* rootSaga() {
    yield all([fork(watchLoadMasterUser)])
}
