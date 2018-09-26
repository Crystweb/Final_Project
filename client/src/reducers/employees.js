import { ADD_EMPLOYEE } from '../constants/actionTypes'

const initialState = {
  lastEmployees: null
}

export default function addEmployeeReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {...state, lastEmployees: action.employee}
    default:
      return state
  }
}
