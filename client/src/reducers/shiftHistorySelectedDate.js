import { GET_SELECTED_DATE } from '../constants/actionTypes'

const initialState = {
  selectedDate: null
}

export default function addSelectedDate (state = initialState, action) {
  switch (action.type) {
    case GET_SELECTED_DATE:
      return {...state, selectedDate: action.date}
    default:
      return state
  }
}
