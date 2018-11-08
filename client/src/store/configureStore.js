import { applyMiddleware, createStore } from 'redux'
import combineReducers from 'redux/es/combineReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import shift from '../reducers/comments'
import shiftHistorySelectedDate from '../reducers/selectedDate'
import user from '../reducers/startData'
import tasks from '../reducers/tasks'
import vacanciesReducer from '../reducers/vacanciesReducer'
import roomCheck from '../reducers/roomCheck'
import {reducer as toastrReducer} from 'react-redux-toastr'

const reducers = {
  comments: shift,
  selectedDate: shiftHistorySelectedDate,
  startData: user,
  vacancies: vacanciesReducer,
  tasks: tasks,
  checkIn: roomCheck,
  toastr: toastrReducer
}

const rootReducer = combineReducers(reducers)

export default function configureStore () {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  return store
}
