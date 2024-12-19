import {
    LOAD_TRANSACTION_BUDGETS,
    LOAD_TRANSACTION_BUDGETS_ERROR,
    LOAD_TRANSACTION_BUDGETS_SUCCESS,
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
        case LOAD_TRANSACTION_BUDGETS:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case LOAD_TRANSACTION_BUDGETS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
                meta: action.payload.meta,
            }
        case LOAD_TRANSACTION_BUDGETS_ERROR:
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
