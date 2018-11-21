import React from 'react'
import ReactDOM from 'react-dom'
import './styles/Index.css'
import { Provider } from 'react-redux'
import configoreStore from './store/configureStore'
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import ToastrMessage from './components/ToastrMessage'

const store = configoreStore()

ReactDOM.render(<Provider store={store}><BrowserRouter>
  <div>
    <ToastrMessage/>
    <App/>
  </div>
</BrowserRouter>
</Provider>, document.getElementById('root'))
