import { all, call, fork, takeEvery, put } from 'redux-saga/effects'

import { TransactionBudgetService } from '@/services/api/TransactionBudgetService'
import {
    LOAD_TRANSACTION_BUDGETS,
    loadTransactionBudgetSuccess,
    loadTransactionBudgetError,
} from './action'

const loadTransactionBudgetsAsync = async (params?: any, signal?: any) =>
    TransactionBudgetService.List(params, signal)

function* loadTransactionBudget({ payload }) {
    try {
        const response = yield call(loadTransactionBudgetsAsync, payload.params, payload.signal)
        yield put(loadTransactionBudgetSuccess(response.data.data, response.data.meta))
    } catch (error: any) {
        yield put(loadTransactionBudgetError(error?.message ?? 'Unknown error'))
    }
}

function* watchLoadTransactionBudget() {
    yield takeEvery<any>(LOAD_TRANSACTION_BUDGETS, loadTransactionBudget)
}

export default function* rootSaga() {
    yield all([fork(watchLoadTransactionBudget)])
}
