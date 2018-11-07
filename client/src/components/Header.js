import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/App.css'
import routes from '../constants/routes'
import user_icon from '../img/user_icon.png'
import logo from '../img/logo_f50.png'
import back from '../img/back.png'
import logout from '../img/log-out-button.png'
import Preloader from './Preloader'

class Header extends Component {
  render () {
    const {previousRoute} = this.props;
    if (previousRoute === undefined) {
      return (
        <Preloader/>
      )
    } else {
      return (
        <header className='header'>
          <div className="header-leftIcon">
          {(previousRoute.previousHref != null) || <img src={logout} alt="logout"/>}
          {previousRoute.previousHref && <Link to={previousRoute.previousHref} className='header__item'>
            <img src={back} alt='logo'/>
            <h4>Назад</h4>
          </Link>}
          </div>
          {/*<h3 className='header__pageName'>{previousRoute.name}</h3>*/}
          <Link to={routes.profile.href} className='header__profile'><img src={user_icon} alt='profile'/></Link>
          <Link to={routes.home.href} className='header__title'><img src={logo} alt='logo'/></Link>
        </header>
      )
    }
  }
}

export default Header
