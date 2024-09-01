import { TMeta } from '@/components/MTable/types'

export const LOAD_MASTER_USERS = '[PENDING] MASTER_USERS'
export const LOAD_MASTER_USERS_SUCCESS = '[SUCCESS] MASTER_USERS'
export const LOAD_MASTER_USERS_ERROR = '[ERROR] MASTER_USERS'

export const loadMasterUser = (params?: any, signal?: any) => ({
    type: LOAD_MASTER_USERS,
    payload: { params, signal },
})

export const loadMasterUserSuccess = (data: any[], meta: TMeta) => ({
    type: LOAD_MASTER_USERS_SUCCESS,
    payload: {
        data,
        meta,
    },
})

export const loadMasterUserError = (message?: string) => ({
    type: LOAD_MASTER_USERS_ERROR,
    payload: {
        message,
    },
})
