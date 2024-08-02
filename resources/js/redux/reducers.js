import { combineReducers } from "redux";
import defaultStateApp from '@/redux/defaultState/reducer'
//:end-import: jangan dihapus!

const reducers = combineReducers({
  defaultStateApp,
  //:end-combine: jangan dihapus!
})

export default reducers;