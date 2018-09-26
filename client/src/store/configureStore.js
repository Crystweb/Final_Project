import { applyMiddleware, createStore } from 'redux'
import combineReducers from 'redux/es/combineReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import shift from '../reducers/comments'
import shiftHistorySelectedDate from '../reducers/shiftHistorySelectedDate'
import user from '../reducers/startData'
import tasks from '../reducers/tasks'
import vacanciesReducer from "../reducers/vacanciesReducer";

const reducers = {
  comments: shift,
  shiftHistorySelectedDate: shiftHistorySelectedDate,
  startData: user,
  vacancies: vacanciesReducer,
  tasks: tasks
}

const rootReducer = combineReducers(reducers)

export default function configureStore () {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  return store
}
