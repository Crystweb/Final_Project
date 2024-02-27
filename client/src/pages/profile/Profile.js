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
            <div className="profile_data">
              <span className="text">{user.phoneNumber}&nbsp;&nbsp;&nbsp;{user.mail}</span>
            </div>
          </div>
          <div className= "profile">
            <div className="profile_img">
              <img className="user_photo" src={current_user} alt="Вставить фотографию :"/>
            </div>
            <div className="profile_info">
              <div className= "profile_data">
                <p className="text">{user.info}</p>
              </div>
            </div>
          </div>
          <button  type="submit" className="button_save"><a href="/profile/edit">изменить профиль</a></button>
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