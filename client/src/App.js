import React, { Component } from 'react'
import './styles/app.css'
import Home from './pages/Home'
import { Route, Switch } from 'react-router-dom'
import Comments from './pages/comments/Comments'

class App extends Component {
  render () {
    return (
      <div className="container">
        <header className="header">
          <h2 className="header__title">HOTEL CALIFORNIA</h2>
        </header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/comments' component={Comments}/>
        </Switch>
      </div>
    )
  }
}

export default App
