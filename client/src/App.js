import React, { Component } from 'react'
import './styles/App.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Preloader from './components/Preloader'
import Navigation from './components/Navigation'
import SignIn from './pages/authentication/SignIn'
import WsHandler from './components/WsHandler'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { bindActionCreators } from 'redux'
import initData from './actions/initData'

class App extends Component {
  componentDidMount () {
    if (localStorage.getItem('token')) {
      this.props.initData()
    }
  }

  render () {
    if (!localStorage.getItem('token')) {
      return (
        <SignIn/>
      )
    }
    const {loading} = this.props

    if (loading) {
      return <Preloader/>
    }

    return (
      <div className="container">
        <WsHandler/>
        <Navigation header={true}/>
        <Navigation/>
      </div>
    )
  }
}

const mapStateToProps = ({comments, startData}) => {
  return {
    loading: startData.startDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initData: bindActionCreators(initData, dispatch),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
