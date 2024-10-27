import { TMeta } from '@/components/MTable/types'

export const LOAD_MASTER_ROLES = '[PENDING] MASTER_ROLES'
export const LOAD_MASTER_ROLES_SUCCESS = '[SUCCESS] MASTER_ROLES'
export const LOAD_MASTER_ROLES_ERROR = '[ERROR] MASTER_ROLES'

export const loadMasterRole = (params?: any, signal?: any) => ({
    type: LOAD_MASTER_ROLES,
    payload: {params, signal},
})

export const loadMasterRoleSuccess = (data: any[], meta: TMeta) => ({
    type: LOAD_MASTER_ROLES_SUCCESS,
    payload: {
        data,
        meta,
    },
})

export const loadMasterRoleError = (message?: string) => ({
    type: LOAD_MASTER_ROLES_ERROR,
    payload: {
        message,
    },
})
