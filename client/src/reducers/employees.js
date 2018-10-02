import { ADD_EMPLOYEE } from '../constants/actionTypes'

const initialState = {
  employeesList: null
}

export default function addEmployeeReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {...state, employeesList: action.employee}
    default:
      return state
  }
}
