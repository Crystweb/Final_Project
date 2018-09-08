import { GET_COMMETNS_FOR_SELECTED_DATE, GET_SELECTED_DATE } from '../constants/actionTypes'

const initialState = {
  selectedDate: null,
  commentsForSelectedDates: null
}

export default function addSelectedDate (state = initialState, action) {
  switch (action.type) {
    case GET_SELECTED_DATE:
      return {...state, selectedDate: action.date}
    case GET_COMMETNS_FOR_SELECTED_DATE:
      return {...state, commentsForSelectedDates: action.comments}
    default:
      return state
  }
}
