import { ADD_SHIFT } from '../constants/actionTypes'

const initialState = {
  lastComments: null
}

export default function addShiftReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_SHIFT:
      return {...state, lastComments: action.shift}
    default:
      return state
  }
}
