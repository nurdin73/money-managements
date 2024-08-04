import { all } from 'redux-saga/effects'
import authSagas from './auth/sagas'
//:end-import: jangan dihapus!

export default function* rootSaga() {
  yield all([
    authSagas(),
    //:end-combine: jangan dihapus!
  ])
}