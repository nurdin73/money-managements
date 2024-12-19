import { TMeta } from '@/components/MTable/types'

export const LOAD_TRANSACTION_BUDGETS = '[PENDING] TRANSACTION_BUDGETS'
export const LOAD_TRANSACTION_BUDGETS_SUCCESS = '[SUCCESS] TRANSACTION_BUDGETS'
export const LOAD_TRANSACTION_BUDGETS_ERROR = '[ERROR] TRANSACTION_BUDGETS'

export const loadTransactionBudget = (params?: any, signal?: any) => ({
    type: LOAD_TRANSACTION_BUDGETS,
    payload: {params, signal},
})

export const loadTransactionBudgetSuccess = (data: any[], meta: TMeta) => ({
    type: LOAD_TRANSACTION_BUDGETS_SUCCESS,
    payload: {
        data,
        meta,
    },
})

export const loadTransactionBudgetError = (message?: string) => ({
    type: LOAD_TRANSACTION_BUDGETS_ERROR,
    payload: {
        message,
    },
})
