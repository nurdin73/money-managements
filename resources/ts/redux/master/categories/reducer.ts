import {
    LOAD_MASTER_CATEGORIES,
    LOAD_MASTER_CATEGORIES_ERROR,
    LOAD_MASTER_CATEGORIES_SUCCESS,
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
        case LOAD_MASTER_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case LOAD_MASTER_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
                meta: action.payload.meta,
            }
        case LOAD_MASTER_CATEGORIES_ERROR:
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
