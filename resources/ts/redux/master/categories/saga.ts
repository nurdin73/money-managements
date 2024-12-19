import { all, call, fork, takeEvery, put } from 'redux-saga/effects'

import { MasterCategoryService } from '@/services/api/MasterCategoryService'
import {
    LOAD_MASTER_CATEGORIES,
    loadMasterCategorySuccess,
    loadMasterCategoryError,
} from './action'

const loadMasterCategorysAsync = async (params?: any, signal?: any) =>
    MasterCategoryService.List(params, signal)

function* loadMasterCategory({ payload }) {
    try {
        const response = yield call(loadMasterCategorysAsync, payload.params, payload.signal)
        yield put(loadMasterCategorySuccess(response.data.data, response.data.meta))
    } catch (error: any) {
        yield put(loadMasterCategoryError(error?.message ?? 'Unknown error'))
    }
}

function* watchLoadMasterCategory() {
    yield takeEvery<any>(LOAD_MASTER_CATEGORIES, loadMasterCategory)
}

export default function* rootSaga() {
    yield all([fork(watchLoadMasterCategory)])
}
