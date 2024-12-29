import dayjs from "dayjs"
import { SET_RANGE_PERIOD, LOAD_BASIC_STATISTIC, LOAD_BASIC_STATISTIC_ERROR, LOAD_BASIC_STATISTIC_SUCCESS, LOAD_BUDGET_EFFECIENCY, LOAD_BUDGET_EFFECIENCY_ERROR, LOAD_BUDGET_EFFECIENCY_SUCCESS, LOAD_BUDGET_SUMMARY, LOAD_BUDGET_SUMMARY_ERROR, LOAD_BUDGET_SUMMARY_SUCCESS, LOAD_EXPENSE_DETAIL, LOAD_EXPENSE_DETAIL_ERROR, LOAD_EXPENSE_DETAIL_SUCCESS, LOAD_LAST_TRANSACTION, LOAD_LAST_TRANSACTION_ERROR, LOAD_LAST_TRANSACTION_SUCCESS, LOAD_RATIO, LOAD_RATIO_ERROR, LOAD_RATIO_SUCCESS } from "./action"

const INITIAL_STATE = {
  dateRanges: {
    startDate: Date.parse(dayjs().startOf('month').format('YYYY-MM-DD')),
    endDate: Date.parse(dayjs().endOf('month').format('YYYY-MM-DD')),
  },
  basicStatistic: {
    loading: false,
    error: false,
    message: null,
    data: null
  },
  expenseDetail: {
    loading: false,
    error: false,
    message: null,
    data: null
  },
  budgetSummary: {
    loading: false,
    error: false,
    message: null,
    data: null
  },
  ratio: {
    loading: false,
    error: false,
    message: null,
    data: null
  },
  budgetEffeciency: {
    loading: false,
    error: false,
    message: null,
    data: null
  },
  lastTransactions: {
    loading: false,
    error: false,
    message: null,
    data: null
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RANGE_PERIOD:
      return {
        ...state,
        dateRanges: action.payload,
      }
    case LOAD_BASIC_STATISTIC:
      return {
        ...state,
        basicStatistic: {
          ...state.basicStatistic,
          loading: true,
          error: false,
          message: null,
        },
      }
    case LOAD_BASIC_STATISTIC_SUCCESS:
      return {
        ...state,
        basicStatistic: {
          ...state.basicStatistic,
          loading: false,
          data: action.payload,
        },
      }
    case LOAD_BASIC_STATISTIC_ERROR:
      return {
        ...state,
        basicStatistic: {
          ...state.basicStatistic,
          loading: false,
          error: true,
          message: action.payload,
        },
      }
    case LOAD_EXPENSE_DETAIL:
      return {
        ...state,
        expenseDetail: {
          ...state.expenseDetail,
          loading: true,
          error: false,
          message: null,
        },
      }
    case LOAD_EXPENSE_DETAIL_SUCCESS:
      return {
        ...state,
        expenseDetail: {
          ...state.expenseDetail,
          loading: false,
          data: action.payload,
        },
      }
    case LOAD_EXPENSE_DETAIL_ERROR:
      return {
        ...state,
        expenseDetail: {
          ...state.expenseDetail,
          loading: false,
          error: true,
          message: action.payload,
        },
      }
    case LOAD_BUDGET_SUMMARY:
      return {
        ...state,
        budgetSummary: {
          ...state.budgetSummary,
          loading: true,
          error: false,
          message: null,
        },
      }
    case LOAD_BUDGET_SUMMARY_SUCCESS:
      return {
        ...state,
        budgetSummary: {
          ...state.budgetSummary,
          loading: false,
          data: action.payload,
        },
      }
    case LOAD_BUDGET_SUMMARY_ERROR:
      return {
        ...state,
        budgetSummary: {
          ...state.budgetSummary,
          loading: false,
          error: true,
          message: action.payload,
        },
      }
    case LOAD_RATIO:
      return {
        ...state,
        ratio: {
          ...state.ratio,
          loading: true,
          error: false,
          message: null,
        },
      }
    case LOAD_RATIO_SUCCESS:
      return {
        ...state,
        ratio: {
          ...state.ratio,
          loading: false,
          data: action.payload,
        },
      }
    case LOAD_RATIO_ERROR:
      return {
        ...state,
        ratio: {
          ...state.ratio,
          loading: false,
          error: true,
          message: action.payload,
        },
      }
    case LOAD_BUDGET_EFFECIENCY:
      return {
        ...state,
        budgetEffeciency: {
          ...state.budgetEffeciency,
          loading: true,
          error: false,
          message: null,
        },
      }
    case LOAD_BUDGET_EFFECIENCY_SUCCESS:
      return {
        ...state,
        budgetEffeciency: {
          ...state.budgetEffeciency,
          loading: false,
          data: action.payload,
        },
      }
    case LOAD_BUDGET_EFFECIENCY_ERROR:
      return {
        ...state,
        budgetEffeciency: {
          ...state.budgetEffeciency,
          loading: false,
          error: true,
          message: action.payload,
        },
      }
    case LOAD_LAST_TRANSACTION:
      return {
        ...state,
        lastTransactions: {
          ...state.lastTransactions,
          loading: true,
          error: false,
          message: null,
        },
      }
    case LOAD_LAST_TRANSACTION_SUCCESS:
      return {
        ...state,
        lastTransactions: {
          ...state.lastTransactions,
          loading: false,
          data: action.payload,
        },
      }
    case LOAD_LAST_TRANSACTION_ERROR:
      return {
        ...state,
        lastTransactions: {
          ...state.lastTransactions,
          loading: false,
          error: true,
          message: action.payload,
        },
      }
    default:
      return state
  }
}