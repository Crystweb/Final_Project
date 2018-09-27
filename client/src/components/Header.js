import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/App.css'
import routes from '../constants/routes'
import logo from '../img/logo_f50.png'
import back from '../img/back.png'
import logout from '../img/log-out-button.png'
import Preloader from './Preloader'

class Header extends Component {
  render () {
    const {previousRoute} = this.props
    if (previousRoute === undefined) {
      return (
        <Preloader/>
      )
    } else {
      return (
        <header className='header'>
          {(previousRoute.previousHref != null) || <img src={logout} alt="logout"/>}
          {previousRoute.previousHref && <Link to={previousRoute.previousHref} className='header__item'>
            <img src={back} alt='logo'/>
            <h4>Назад</h4>
          </Link>}
          <h3 className='header__pageName'>{previousRoute.name}</h3>
          <Link to={routes.home.href} className='header__title'><img src={logo} alt='logo'/></Link>
        </header>
      )
    }
  }
}

export default Header
