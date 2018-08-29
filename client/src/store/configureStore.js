import { applyMiddleware, createStore } from 'redux'
import combineReducers from 'redux/es/combineReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import shift from '../reducers/shift'
import shiftHistorySelectedDate from '../reducers/shiftHistorySelectedDate'
import user from '../reducers/user'

const reducers = {
  shift: shift,
  shiftHistorySelectedDate: shiftHistorySelectedDate,
  user: user
}

const rootReducer = combineReducers(reducers)

export default function configureStore () {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  return store
}
