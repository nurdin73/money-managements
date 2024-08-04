import { combineReducers } from "redux";
import defaultStateApp from '@/redux/defaultState/reducer'
import authApp from './auth/reducer'
//:end-import: jangan dihapus!

const reducers = combineReducers({
  defaultStateApp,
  authApp,
  //:end-combine: jangan dihapus!
})

export default reducers;