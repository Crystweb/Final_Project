import React, { Component } from 'react'
import { signInStyles } from '../../constants/SignInStyles'
import yesImg from '../../img/yes.png'
import routes from '../../constants/routes'
import Link from 'react-router-dom/es/Link'
import * as _ from 'lodash'
import axios from 'axios'

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
    const {userName, userPassword} = this.props
    if (!userName || !userPassword) {

    }
    axios.post('/login')
  }

  render () {
    const {userName, userPassword} = this.state
    return (
      <div style={signInStyles.container}>
        <div style={userName ? signInStyles.inputContainerWithData : signInStyles.inputContainerWithoutData}>
          <label style={signInStyles.label} htmlFor='userName'>Введите логин</label>
          <span style={signInStyles.inputBlock}>
            <input style={userName ? signInStyles.withData : signInStyles.withoutData} name='userName' type='text' onChange={this.setUserName} maxLength={20}/>
            {userName && <img style={signInStyles.confirm} src={yesImg} alt="yes"/>}
          </span>
        </div>
        <div style={userPassword ? signInStyles.inputContainerWithData : signInStyles.inputContainerWithoutData}>
          <label style={signInStyles.label} htmlFor='userPassword'>Введите пароль</label>
          <span style={signInStyles.inputBlock}>
            <input style={userPassword ? signInStyles.withData : signInStyles.withoutData} name='userPassword' type='password' onChange={this.setUserPassword} maxLength={20}/>
            {userPassword && <img style={signInStyles.confirm} src={yesImg} alt="yes"/>}
          </span>
        </div>
        <div style={signInStyles.signInServices}>
          <span style={signInStyles.label}>
            <input type='checkbox'/>
            запомнить меня
          </span>
          <Link style={signInStyles.linkToRestorePassword} to={routes.taskForRoom.href}>Забыли пароль?</Link>
        </div>
        <span style={signInStyles.signIn} onClick={this.signIn}>ВОЙТИ</span>
      </div>
    )
  }
}

export default SignIn
