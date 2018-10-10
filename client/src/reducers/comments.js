import { ADD_NEW_COMMENT, ADD_SHIFT, DELETE_COMMENT } from '../constants/actionTypes'

const initialState = {
  lastComments: null
}

export default function addShiftReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_SHIFT:
      return {...state, lastComments: action.shift}
    case DELETE_COMMENT:
      return {...state, lastComments: [...state.lastComments.filter(comment => comment.id !== action.id)]}
    case ADD_NEW_COMMENT:
        return {...state, lastComments: [...state.lastComments, action.comment]}
    default:
      return state
  }
}
