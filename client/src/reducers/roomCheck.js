import { ADD_ROOM_CHECK_HISTORY } from '../constants/actionTypes'

const initialState = {
  roomCheckHistory: null
}

export default function roomCheckReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM_CHECK_HISTORY:
      return {...state, roomCheckHistory: action.roomCheck}
    default:
      return state
  }
}
