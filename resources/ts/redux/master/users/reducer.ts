import {
    LOAD_MASTER_USERS,
    LOAD_MASTER_USERS_ERROR,
    LOAD_MASTER_USERS_SUCCESS,
} from './action'

const INITIAL_STATE = {
    loading: false,
    error: false,
    data: [],
    message: null,
    meta: {
        page: 1,
        perPage: 10,
        total: 1,
        totalData: 10,
        totalPage: 1,
        firstItem: 1,
        lastItem: 1
    },
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_MASTER_USERS:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case LOAD_MASTER_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
                meta: action.payload.meta,
            }
        case LOAD_MASTER_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.message,
            }
        default:
            return state
    }
}
