import { ADD_SHIFT } from '../constants/actionTypes'

const initialState = {
  shift: null
}

export default function addShiftReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_SHIFT:
      return {...state, shift: action.shift}
    default:
      return state
  }
}
