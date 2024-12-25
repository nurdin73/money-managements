import { all, call, fork, takeEvery, put } from 'redux-saga/effects'

import { TransactionIncomeExpenseService } from '@/services/api/TransactionIncomeExpenseService'
import {
    LOAD_TRANSACTION_INCOME_EXPENSES,
    loadTransactionIncomeExpenseSuccess,
    loadTransactionIncomeExpenseError,
    LOAD_REPORT_INCOME_EXPENSES,
    loadReportIncomeExpenseError,
    loadReportIncomeExpenseSuccess
} from './action'

const loadTransactionIncomeExpensesAsync = async (params?: any, signal?: any) =>
    TransactionIncomeExpenseService.List(params, signal)

const loadReportIncomeExpensesAsync = async (params?: any, signal?: any) => TransactionIncomeExpenseService.Report(params, signal)

function* loadTransactionIncomeExpense({ payload }) {
    try {
        const response = yield call(loadTransactionIncomeExpensesAsync, payload.params, payload.signal)
        yield put(loadTransactionIncomeExpenseSuccess(response.data.data, response.data.meta))
    } catch (error: any) {
        yield put(loadTransactionIncomeExpenseError(error?.message ?? 'Unknown error'))
    }
}

function* loadReportIncomeExpense({ payload }) {
    try {
        const response = yield call(loadReportIncomeExpensesAsync, payload.params, payload.signal)
        yield put(loadReportIncomeExpenseSuccess(response.data.data, response.data.meta))
    } catch (error: any) {
        yield put(loadReportIncomeExpenseError(error?.message ?? 'Unknown error'))
    }
}

function* watchLoadTransactionIncomeExpense() {
    yield takeEvery<any>(LOAD_TRANSACTION_INCOME_EXPENSES, loadTransactionIncomeExpense)
}

function* watchLoadReportIncomeExpense() {
    yield takeEvery<any>(LOAD_REPORT_INCOME_EXPENSES, loadReportIncomeExpense)
}

export default function* rootSaga() {
    yield all([fork(watchLoadTransactionIncomeExpense), fork(watchLoadReportIncomeExpense)])
}
