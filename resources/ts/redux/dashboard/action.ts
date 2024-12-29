export const SET_RANGE_PERIOD = 'SET_RANGE_PERIOD';

export const LOAD_BASIC_STATISTIC = '[PENDING] LOAD_BASIC_STATISTIC'
export const LOAD_BASIC_STATISTIC_SUCCESS = '[SUCCESS] LOAD_BASIC_STATISTIC'
export const LOAD_BASIC_STATISTIC_ERROR = '[ERROR] LOAD_BASIC_STATISTIC'

export const LOAD_EXPENSE_DETAIL = '[PENDING] LOAD_EXPENSE_DETAIL'
export const LOAD_EXPENSE_DETAIL_SUCCESS = '[SUCCESS] LOAD_EXPENSE_DETAIL'
export const LOAD_EXPENSE_DETAIL_ERROR = '[ERROR] LOAD_EXPENSE_DETAIL'

export const LOAD_BUDGET_SUMMARY = '[PENDING] LOAD_BUDGET_SUMMARY'
export const LOAD_BUDGET_SUMMARY_SUCCESS = '[SUCCESS] LOAD_BUDGET_SUMMARY'
export const LOAD_BUDGET_SUMMARY_ERROR = '[ERROR] LOAD_BUDGET_SUMMARY'

export const LOAD_RATIO = '[PENDING] LOAD_RATIO'
export const LOAD_RATIO_SUCCESS = '[SUCCESS] LOAD_RATIO'
export const LOAD_RATIO_ERROR = '[ERROR] LOAD_RATIO'

export const LOAD_BUDGET_EFFECIENCY = '[PENDING] LOAD_BUDGET_EFFECIENCY'
export const LOAD_BUDGET_EFFECIENCY_SUCCESS = '[SUCCESS] LOAD_BUDGET_EFFECIENCY'
export const LOAD_BUDGET_EFFECIENCY_ERROR = '[ERROR] LOAD_BUDGET_EFFECIENCY'

export const LOAD_LAST_TRANSACTION = '[PENDING] LOAD_LAST_TRANSACTION'
export const LOAD_LAST_TRANSACTION_SUCCESS = '[SUCCESS] LOAD_LAST_TRANSACTION'
export const LOAD_LAST_TRANSACTION_ERROR = '[ERROR] LOAD_LAST_TRANSACTION'

export const setRangePeriod = (rangePeriod: any) => ({
  type: SET_RANGE_PERIOD,
  payload: rangePeriod,
});

export const loadBasicStatistic = (params: any) => ({
  type: LOAD_BASIC_STATISTIC,
  payload: params,
});

export const loadBasicStatisticSuccess = (data: any) => ({
  type: LOAD_BASIC_STATISTIC_SUCCESS,
  payload: data,
});

export const loadBasicStatisticError = (error: any) => ({
  type: LOAD_BASIC_STATISTIC_ERROR,
  payload: error,
});

export const loadExpenseDetail = (params: any) => ({
  type: LOAD_EXPENSE_DETAIL,
  payload: params,
});

export const loadExpenseDetailSuccess = (data: any) => ({
  type: LOAD_EXPENSE_DETAIL_SUCCESS,
  payload: data,
});

export const loadExpenseDetailError = (error: any) => ({
  type: LOAD_EXPENSE_DETAIL_ERROR,
  payload: error,
});

export const loadBudgetSummary = (params: any) => ({
  type: LOAD_BUDGET_SUMMARY,
  payload: params,
});

export const loadBudgetSummarySuccess = (data: any) => ({
  type: LOAD_BUDGET_SUMMARY_SUCCESS,
  payload: data,
});

export const loadBudgetSummaryError = (error: any) => ({
  type: LOAD_BUDGET_SUMMARY_ERROR,
  payload: error,
});

export const loadRatio = (params: any) => ({
  type: LOAD_RATIO,
  payload: params,
});

export const loadRatioSuccess = (data: any) => ({
  type: LOAD_RATIO_SUCCESS,
  payload: data,
});

export const loadRatioError = (error: any) => ({
  type: LOAD_RATIO_ERROR,
  payload: error,
});

export const loadBudgetEffeciency = (params: any) => ({
  type: LOAD_BUDGET_EFFECIENCY,
  payload: params,
});

export const loadBudgetEffeciencySuccess = (data: any) => ({
  type: LOAD_BUDGET_EFFECIENCY_SUCCESS,
  payload: data,
});

export const loadBudgetEffeciencyError = (error: any) => ({
  type: LOAD_BUDGET_EFFECIENCY_ERROR,
  payload: error,
});

export const loadLastTransaction = (params: any) => ({
  type: LOAD_LAST_TRANSACTION,
  payload: params,
});

export const loadLastTransactionSuccess = (data: any) => ({
  type: LOAD_LAST_TRANSACTION_SUCCESS,
  payload: data,
});

export const loadLastTransactionError = (error: any) => ({
  type: LOAD_LAST_TRANSACTION_ERROR,
  payload: error,
});