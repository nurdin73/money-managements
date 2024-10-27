import { all } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import masterUsersSaga from './master/users/saga'
import masterRolesSaga from './master/roles/saga'
//:end-import: jangan dihapus!

export default function* rootSaga() {
  yield all([
    authSagas(),
    masterUsersSaga(),
        masterRolesSaga(),
        //:end-combine: jangan dihapus!
  ])
}