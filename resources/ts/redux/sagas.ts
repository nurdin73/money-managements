import { all } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import transactionIncomeExpensesSaga from './transaction/income-expenses/saga'
import transactionBudgetsSaga from './transaction/budgets/saga'
import masterCategorysSaga from './master/categories/saga'
//:end-import: jangan dihapus!

export default function* rootSaga() {
  yield all([
    authSagas(),
    transactionIncomeExpensesSaga(),
    transactionBudgetsSaga(),
    masterCategorysSaga(),
    //:end-combine: jangan dihapus!
  ])
}