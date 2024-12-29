import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as action from './action';
import DashboardService from "@/services/api/DashboardService";

const loadBasicStatisticAsync = async (params?: any) => DashboardService.BasicStatistic(params);
const loadExpenseDetailAsync = async (params?: any) => DashboardService.ExpenseDetail(params);
const loadFinancialIndicatorAync = async (params?: any) => DashboardService.FinancialIndicator(params);
const loadBudgetSummaryAsync = async (params?: any) => DashboardService.BudgetSummary(params);
const loadLastTransactionAsync = async (params?: any) => DashboardService.LastTransaction(params);
const loadBudgetEffeciencyAsync = async (params?: any) => DashboardService.BudgetEffeciency(params);

function* loadBasicStatistic({ payload }) {
  try {
    const response = yield call(loadBasicStatisticAsync, payload);
    yield put(action.loadBasicStatisticSuccess(response.data.data));
  } catch (error: any) {
    yield put(action.loadBasicStatisticError(error?.message ?? 'Unknown error'))
  }
}

function* watchLoadBasicStatistic() {
  yield takeEvery<any>(action.LOAD_BASIC_STATISTIC, loadBasicStatistic);
}


function* loadExpenseDetail({ payload }) {
  try {
    const response = yield call(loadExpenseDetailAsync, payload);
    yield put(action.loadExpenseDetailSuccess(response.data.data));
  } catch (error: any) {
    yield put(action.loadExpenseDetailError(error?.message ?? 'Unknown error'));
  }
}

function* watchLoadExpenseDetail() {
  yield takeEvery<any>(action.LOAD_EXPENSE_DETAIL, loadExpenseDetail);
}

function* loadRatio({ payload }) {
  try {
    const response = yield call(loadFinancialIndicatorAync, payload);
    yield put(action.loadRatioSuccess(response.data.data));
  } catch (error: any) {
    yield put(action.loadRatioError(error?.message ?? 'Unknown error'));
  }
}

function* watchLoadFinancialIndicator() {
  yield takeEvery<any>(action.LOAD_RATIO, loadRatio);
}

function* loadBudgetSummary({ payload }) {
  try {
    const response = yield call(loadBudgetSummaryAsync, payload);
    yield put(action.loadBudgetSummarySuccess(response.data.data));
  } catch (error: any) {
    yield put(action.loadBudgetSummaryError(error?.message ?? 'Unknown error'));
  }
}

function* watchLoadBudgetSummary() {
  yield takeEvery<any>(action.LOAD_BUDGET_SUMMARY, loadBudgetSummary);
}

function* loadLastTransaction({ payload }) {
  try {
    const response = yield call(loadLastTransactionAsync, payload);
    yield put(action.loadLastTransactionSuccess(response.data.data));
  } catch (error: any) {
    yield put(action.loadLastTransactionError(error?.message ?? 'Unknown error'));
  }
}

function* watchLoadLastTransaction() {
  yield takeEvery<any>(action.LOAD_LAST_TRANSACTION, loadLastTransaction);
}

function* loadBudgetEffeciency({ payload }) {
  try {
    const response = yield call(loadBudgetEffeciencyAsync, payload);
    yield put(action.loadBudgetEffeciencySuccess(response.data.data));
  } catch (error: any) {
    yield put(action.loadBudgetEffeciencyError(error?.message ?? 'Unknown error'));
  }
}

function* watchLoadBudgetEffeciency() {
  yield takeEvery<any>(action.LOAD_BUDGET_EFFECIENCY, loadBudgetEffeciency);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoadBasicStatistic),
    fork(watchLoadExpenseDetail),
    fork(watchLoadFinancialIndicator),
    fork(watchLoadBudgetSummary),
    fork(watchLoadLastTransaction),
    fork(watchLoadBudgetEffeciency),
  ]);
}