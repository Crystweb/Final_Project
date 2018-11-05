import React, { Component } from 'react'
import '../../styles/Profile.css'
import current_user from '../../img/current_user.png'
import connect from "react-redux/es/connect/connect";

class Profile extends Component {
  render () {
    const {user} = this.props;
    return (
      <div className="container">
        <div className="profile_column">
          <div className="profile_title">
            <h1>{user.surname}&nbsp;{user.forename}</h1>
          </div>
          <div className="profile_img">
           <img className="user_photo" src={current_user} alt="Нет фото"/>
          </div>
          <div className="profile_info">
            <p>Ваш номер телефона :</p>
            <a href="tel: {user.phoneNumber}">{user.phoneNumber}</a>
            <a href="mailto: example@mail.ru">example@mail.ru</a>
            <input name="u_phone" type="tel" defaultValue={user.phoneNumber}/>
            <p>Ваш e-mail :</p>
            <input name="u_mail" type="email" defaultValue={user.mail}/>
          </div>
          <button className="button_save">изменить</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.startData.currentUser.employee
  }
};

export default connect(mapStateToProps)(Profile)