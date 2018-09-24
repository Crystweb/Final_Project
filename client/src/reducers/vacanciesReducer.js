import {GET_ALL_VACANCIES, ADD_NEW_VACANCY} from '../constants/actionTypes'

export default function vacanciesReducer (state = [], action) {
  switch (action.type) {
    case GET_ALL_VACANCIES:
      return action.payload
    case ADD_NEW_VACANCY:
      return [...state, action.payload]
    default:
      return state
  }
}
