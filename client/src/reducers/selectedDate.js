import { ADD_TASKS_FOR_HISTORY, GET_COMMETNS_FOR_SELECTED_DATE, GET_SELECTED_DATE } from '../constants/actionTypes'

const initialState = {
  historySelectedDate: null,
  commentsForSelectedDates: null,
  tasksForSelectedDates: null
}

export default function addSelectedDate (state = initialState, action) {
  switch (action.type) {
    case GET_SELECTED_DATE:
      return {...state, historySelectedDate: action.date}
    case GET_COMMETNS_FOR_SELECTED_DATE:
      return {...state, commentsForSelectedDates: action.comments}
    case ADD_TASKS_FOR_HISTORY:
      return {...state, tasksForSelectedDates: action.task}
    default:
      return state
  }
}
