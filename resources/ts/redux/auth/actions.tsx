export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER'
export const LOAD_CURRENT_USER_SUCCESS = 'LOAD_CURRENT_USER_SUCCESS'
export const LOAD_CURRENT_USER_ERROR = 'LOAD_CURRENT_USER_ERROR'

export const loginUser = (user, navigate) => ({
  type: LOGIN_USER,
  payload: { user, navigate },
})
export const loginUserSuccess = (token) => ({
  type: LOGIN_USER_SUCCESS,
  payload: token,
})
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
})
export const logoutUser = () => ({
  type: LOGOUT_USER,
})
export const loadCurrentUser = (navigate) => ({
  type: LOAD_CURRENT_USER,
  payload: { navigate },
})
export const loadCurrentUserSuccess = (user) => ({
  type: LOAD_CURRENT_USER_SUCCESS,
  payload: user,
})
export const loadCurrentUserError = (message) => ({
  type: LOAD_CURRENT_USER_ERROR,
  payload: { message },
})
