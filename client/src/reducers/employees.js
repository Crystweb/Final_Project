import { ADD_EMPLOYEES } from '../constants/actionTypes'

const initialState = {
  employees: null
}

export default function addEmployeesReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEES:
      return {...state, employees: action.employeesList}
    default:
      return state
  }
}
