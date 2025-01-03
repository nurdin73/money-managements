import { TMeta } from '@/components/MTable/types'

export const LOAD_TRANSACTION_INCOME_EXPENSES = '[PENDING] TRANSACTION_INCOME_EXPENSES'
export const LOAD_TRANSACTION_INCOME_EXPENSES_SUCCESS = '[SUCCESS] TRANSACTION_INCOME_EXPENSES'
export const LOAD_TRANSACTION_INCOME_EXPENSES_ERROR = '[ERROR] TRANSACTION_INCOME_EXPENSES'

export const LOAD_REPORT_INCOME_EXPENSES = '[PENDING] REPORT_INCOME_EXPENSES'
export const LOAD_REPORT_INCOME_EXPENSES_SUCCESS = '[SUCCESS] REPORT_INCOME_EXPENSES'
export const LOAD_REPORT_INCOME_EXPENSES_ERROR = '[ERROR] REPORT_INCOME_EXPENSES'

export const loadTransactionIncomeExpense = (params?: any, signal?: any) => ({
    type: LOAD_TRANSACTION_INCOME_EXPENSES,
    payload: { params, signal },
})

export const loadTransactionIncomeExpenseSuccess = (data: any[], meta: TMeta) => ({
    type: LOAD_TRANSACTION_INCOME_EXPENSES_SUCCESS,
    payload: {
        data,
        meta,
    },
})

export const loadTransactionIncomeExpenseError = (message?: string) => ({
    type: LOAD_TRANSACTION_INCOME_EXPENSES_ERROR,
    payload: {
        message,
    },
})

export const loadReportIncomeExpense = (params?: any, signal?: any) => ({
    type: LOAD_REPORT_INCOME_EXPENSES,
    payload: { params, signal },
})

export const loadReportIncomeExpenseSuccess = (data: any[], meta: TMeta) => ({
    type: LOAD_REPORT_INCOME_EXPENSES_SUCCESS,
    payload: {
        data,
        meta,
    },
})

export const loadReportIncomeExpenseError = (message?: string) => ({
    type: LOAD_REPORT_INCOME_EXPENSES_ERROR,
    payload: {
        message,
    },
})
