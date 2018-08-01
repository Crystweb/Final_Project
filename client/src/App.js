import React, { Component } from 'react'
import logo from './logo.svg'
import './styles/App.css'
import Preloader from './components/Preloader'

class App extends Component {
  render () {
    return (
      <Preloader/>
      // <div className="App">
      //   <header className="App-header">
      //     <Preloader/>
      //     <img src= {logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    )
  }
}

export default App
