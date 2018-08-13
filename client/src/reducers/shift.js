import { ADD_SHIFT } from '../constants/actionTypes'

const initialState = {
  lastShift: null
}

export default function addShiftReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_SHIFT:
      return {...state, lastShift: action.shift}
    default:
      return state
  }
}
