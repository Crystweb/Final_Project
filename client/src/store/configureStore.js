import { applyMiddleware, createStore } from 'redux'
import combineReducers from 'redux/es/combineReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import shift from '../reducers/shift'
import shiftHistorySelectedDate from '../reducers/shiftHistorySelectedDate'

const reducers = {
  shift: shift,
  shiftHistorySelectedDate: shiftHistorySelectedDate,
  form: formReducer

}

const rootReducer = combineReducers(reducers)

export default function configureStore () {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  return store
}
