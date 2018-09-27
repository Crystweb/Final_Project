import { GET_TASKS } from '../constants/actionTypes'

const initialState = {
  allTasks: null
}

export default function tasksReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {...state, allTasks: action.tasks}
    default:
      return state
  }
}
