import { getCurrentToken, getCurrentUser } from '../../helpers/utils'
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    LOAD_CURRENT_USER,
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_ERROR,
} from './actions'

const INIT_STATE = {
    currentUser: getCurrentUser(),
    forgotUserMail: '',
    newPassword: '',
    resetPasswordCode: '',
    currentToken: getCurrentToken(),
    loading: false,
    error: '',
    tokenJson: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: '' }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentToken: action.payload,
                error: '',
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                currentToken: null,
                error: action.payload.message,
            }
        case LOAD_CURRENT_USER:
            return { ...state, loading: true, error: '' }
        case LOAD_CURRENT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                error: '',
            }
        case LOAD_CURRENT_USER_ERROR:
            return {
                ...state,
                loading: false,
                currentUser: null,
                error: action.payload.message,
            }
        case LOGOUT_USER:
            return { ...state, currentUser: null, error: '' }
        default:
            return { ...state }
    }
}
