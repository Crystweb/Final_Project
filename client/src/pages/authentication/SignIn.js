import React, { Component } from 'react'
import yesImg from '../../img/yes.png'
import routes from '../../constants/routes'
import Link from 'react-router-dom/es/Link'
import * as _ from 'lodash'
import axios from 'axios'
import connect from 'react-redux/es/connect/connect'
import logo from '../../img/GreLive.png'
import { bindActionCreators } from 'redux'
import initData from '../../actions/initData'

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: null,
      userPassword: null
    }
    _.bindAll(this, 'setUserName', 'setUserPassword', 'signIn')
  }

  setUserName = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  setUserPassword = (event) => {
    this.setState({
      userPassword: event.target.value
    })
  }

  signIn () {
    const {userName, userPassword} = this.state
    if (!userName || !userPassword) {
      return null
    }
    axios.post('/auth', {
      userName,
      userPassword
    })
      .then(response => {
        localStorage.setItem('token', response.data.token)
      })
      .then(() => this.props.initData())
  }

  render () {
    const {userName, userPassword} = this.state
    return (
      <div className="signIn-container">
        <div className='signIn__logo'>
          <img src={logo} alt="logo"/>
        </div>
        <div className={userName ? 'signIn__login' : 'signIn__loginActive'}>
          <label className='signIn__login-label' htmlFor='userName'>Введите логин</label>
          <span className="signIn__inputBlock">
            <input className={userName ? 'signIn__inputWithData' : 'signIn__inputWithoutData'} name='userName'
              type='text'
              onChange={this.setUserName} maxLength={20}/>
            {userName && <img className="signIn-confirm" src={yesImg} alt="yes"/>}
          </span>
        </div>
        <div className={userPassword ? 'signIn__login' : 'signIn__loginActive'}>
          <label className='signIn__login-label' htmlFor='userPassword'>Введите пароль</label>
          <span className="signIn__inputBlock">
            <input className={userPassword ? 'signIn__inputWithData' : 'signIn__inputWithoutData'} name='userPassword'
              type='password' onChange={this.setUserPassword} maxLength={20}/>
            {userPassword && <img className="signIn-confirm" src={yesImg} alt="yes"/>}
          </span>
        </div>
        <div className="signIn-wrap-checkBoxForgetPass">
          <label className="signIn-check">
            <input className="signIn-check__realCheckbox"
              type='checkbox'/>
            <div className="signIn-check__fakeCheckbox">
              <div className="signIn-check__fakeCheckbox-active"></div>
            </div>
              Запомнить меня
          </label>
          <Link className="signIn-linkToRestorePassword" to={routes.taskForRoom.href}>Забыли пароль?</Link>
        </div>
        <button className="signIn-btn" onClick={this.signIn}>ВОЙТИ</button>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    initData: bindActionCreators(initData, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
