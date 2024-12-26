import { SET_RANGE_PERIOD } from "./action"

const INITIAL_STATE = {
  dateRanges: {
    startDate: new Date(),
    endDate: new Date(),
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RANGE_PERIOD:
      return {
        ...state,
        dateRanges: action.payload,
      }
    default:
      return state
  }
}