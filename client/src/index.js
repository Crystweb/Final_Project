import React from 'react'
import ReactDOM from 'react-dom'
import './styles/Index.css'
import { Provider } from 'react-redux'
import configoreStore from './store/configureStore'
import App from './App'

import { BrowserRouter } from 'react-router-dom'

const store = configoreStore()

ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter>
</Provider>, document.getElementById('root'))
