import { combineReducers } from "redux";
import defaultStateApp from '@/redux/defaultState/reducer'
import authApp from './auth/reducer'
import masterUsersApp from './master/users/reducer'
//:end-import: jangan dihapus!

const reducers = combineReducers({
  defaultStateApp,
  authApp,
  masterUsersApp,
    //:end-combine: jangan dihapus!
})

export default reducers;