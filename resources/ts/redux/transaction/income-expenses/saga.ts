import { all, call, fork, takeEvery, put } from 'redux-saga/effects'

import { TransactionIncomeExpenseService } from '@/services/api/TransactionIncomeExpenseService'
import {
    LOAD_TRANSACTION_INCOME_EXPENSES,
    loadTransactionIncomeExpenseSuccess,
    loadTransactionIncomeExpenseError,
} from './action'

const loadTransactionIncomeExpensesAsync = async (params?: any, signal?: any) =>
    TransactionIncomeExpenseService.List(params, signal)

function* loadTransactionIncomeExpense({ payload }) {
    try {
        const response = yield call(loadTransactionIncomeExpensesAsync, payload.params, payload.signal)
        yield put(loadTransactionIncomeExpenseSuccess(response.data.data, response.data.meta))
    } catch (error: any) {
        yield put(loadTransactionIncomeExpenseError(error?.message ?? 'Unknown error'))
    }
}

function* watchLoadTransactionIncomeExpense() {
    yield takeEvery<any>(LOAD_TRANSACTION_INCOME_EXPENSES, loadTransactionIncomeExpense)
}

export default function* rootSaga() {
    yield all([fork(watchLoadTransactionIncomeExpense)])
}
