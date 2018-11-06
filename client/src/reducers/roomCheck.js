import { ADD_ROOM_CHECK_HISTORY, DELETE_CURRENT_FLOOR, SAVE_CURRENT_FLOOR } from '../constants/actionTypes'

const initialState = {
  roomCheckHistory: null,
  floorId: null
}

export default function roomCheckReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM_CHECK_HISTORY:
      return {...state, roomCheckHistory: action.roomCheck}
    case SAVE_CURRENT_FLOOR:
      return {...state, floorId: action.floor}
    case DELETE_CURRENT_FLOOR:
      return {...state, floorId: null}
    default:
      return state
  }
}
