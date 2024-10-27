import { all, call, fork, takeEvery, put } from 'redux-saga/effects'

import { MasterRoleService } from '@/services/api/MasterRoleService'
import {
    LOAD_MASTER_ROLES,
    loadMasterRoleSuccess,
    loadMasterRoleError,
} from './action'

const loadMasterRolesAsync = async (params?: any, signal?: any) =>
    MasterRoleService.List(params, signal)

function* loadMasterRole({ payload }) {
    try {
        const response = yield call(loadMasterRolesAsync, payload.params, params.signal)
        yield put(loadMasterRoleSuccess(response.data.data, response.data.meta))
    } catch (error: any) {
        yield put(loadMasterRoleError(error?.message ?? 'Unknown error'))
    }
}

function* watchLoadMasterRole() {
    yield takeEvery<any>(LOAD_MASTER_ROLES, loadMasterRole)
}

export default function* rootSaga() {
    yield all([fork(watchLoadMasterRole)])
}
