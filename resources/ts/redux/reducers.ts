import { combineReducers } from "redux";
import defaultStateApp from '@/redux/defaultState/reducer'
import authApp from './auth/reducer'
import transactionIncomeExpensesApp from './transaction/income-expenses/reducer'
import transactionBudgetsApp from './transaction/budgets/reducer'
import masterCategoriesApp from './master/categories/reducer'
import dashboardApp from './dashboard/reducer'

//:end-import: jangan dihapus!

const reducers = combineReducers({
  defaultStateApp,
  authApp,
  transactionIncomeExpensesApp,
  transactionBudgetsApp,
  masterCategoriesApp,
  dashboardApp,
  //:end-combine: jangan dihapus!
})

export default reducers;