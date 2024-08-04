import { all, call, fork, put, takeEvery } from 'redux-saga/effects'

import {
  LOAD_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  loadCurrentUser,
  loadCurrentUserError,
  loadCurrentUserSuccess,
  loginUserError,
  loginUserSuccess,
} from './actions'
import { setCurrentToken, setCurrentUser } from '../../helpers/utils'
import axiosInterceptorInstance from '../../helpers/axiosInterceptor'

const loginUserAsync = async (email, password, captcha) =>
  axiosInterceptorInstance.post(
    '/auth/login',
    {
      password,
      email,
    },
    {
      headers: {
        'x-captcha': captcha,
      },
    }
  )

const logoutUserAsync = async () => axiosInterceptorInstance.post('/auth/logout', {})
const loadUserAsync = async () => axiosInterceptorInstance.get('/auth/profile')

function* loginUser({ payload }): any {
  const { email, password, captcha } = payload.user
  const { navigate } = payload
  try {
    const response = yield call(loginUserAsync, email, password, captcha)
    if (response.data.data.password_expired) {
      navigate('/auth/reset-password', {
        state: {
          token: response.data.data.token,
        },
        replace: true,
      })
      return
    }
    setCurrentToken(response.data.data)
    yield all([put(loginUserSuccess(response.data.data)), put(loadCurrentUser(navigate))])
  } catch (error) {
    console.log('error', error)
    yield put(loginUserError(`${error}`))
  }
}

function* logoutUser() {
  try {
    yield call(logoutUserAsync)
  } catch (error) {
    console.log('error', error)
  }
  setCurrentUser(null)
  setCurrentToken(null)
  window.location.href = '/auth'
}

function* loadUser({ payload }) {
  const { navigate } = payload
  try {
    const response = yield call(loadUserAsync)
    if (response.data.id) {
      const user: any = {
        ...response.data,
        first_name: response.data.name,
        last_name: '',
      }
      setCurrentUser(user)
      yield put(loadCurrentUserSuccess(user))
      if (navigate) {
        navigate('/dashboard', {
          replace: true,
        })
      }
    } else if (response.message) {
      yield put(loadCurrentUserError(response.message))
    } else {
      yield put(loadCurrentUserError('unknown error'))
    }
  } catch (error) {
    yield put(loadCurrentUserError(`${error}`))
  }
}

export function* watchLoginUser() {
  yield takeEvery<any>(LOGIN_USER, loginUser)
}

export function* watchLogoutUser() {
  yield takeEvery<any>(LOGOUT_USER, logoutUser)
}

export function* watchLoadUser() {
  yield takeEvery<any>(LOAD_CURRENT_USER, loadUser)
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchLoadUser)])
}
