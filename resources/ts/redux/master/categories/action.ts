import { TMeta } from '@/components/MTable/types'

export const LOAD_MASTER_CATEGORIES = '[PENDING] MASTER_CATEGORIES'
export const LOAD_MASTER_CATEGORIES_SUCCESS = '[SUCCESS] MASTER_CATEGORIES'
export const LOAD_MASTER_CATEGORIES_ERROR = '[ERROR] MASTER_CATEGORIES'

export const loadMasterCategory = (params?: any, signal?: any) => ({
    type: LOAD_MASTER_CATEGORIES,
    payload: {params, signal},
})

export const loadMasterCategorySuccess = (data: any[], meta: TMeta) => ({
    type: LOAD_MASTER_CATEGORIES_SUCCESS,
    payload: {
        data,
        meta,
    },
})

export const loadMasterCategoryError = (message?: string) => ({
    type: LOAD_MASTER_CATEGORIES_ERROR,
    payload: {
        message,
    },
})
