import React, { Component } from 'react'
import '../../styles/Profile.css'
import current_user from '../../img/current_user.png'
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import InputMask from 'react-input-mask';


class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      profilePhoto: null,
      sendingData: false
    }
  }

  componentDidMount () {
    const {employee} = this.props.employee
    const firstEmployeeLevel = this.props.employee

    if (employee) {
      this.surnameInput.value = employee.surname
      this.forenameInput.value = employee.forename
      this.phoneNumberInput.value = this.phoneNumberInputHide.value
      this.mailInput.value = employee.mail
      this.loginInput.value = firstEmployeeLevel.login
    }
  }

  changePhoto = (event) => {
    this.setState({profilePhoto: event.target.files[0]})
  }

  updateProfile = () => {
    const {surnameInput, forenameInput, phoneNumberInput, mailInput, loginInput} = this
    const {profilePhoto, sendingData} = this.state

    let data = {
      id: this.props.employee.id,
      position: this.props.employee.employee.position,
      surname: surnameInput.value,
      forename: forenameInput.value,
      phoneNumber: phoneNumberInput.value,
      mail: mailInput.value,
      login: loginInput.value
    }

    if (!sendingData) {
      this.setState({sendingData: true})
      if (profilePhoto) {
        let formData = new FormData()
        formData.append('file', profilePhoto)

        axios({
          method: 'post',
          url: `/employee/` + this.props.employee.id,
          data: formData
        }).then(() => {
            this.setState({
              successAdd: 'Фото изменёно',
              sendingData: false
            })
          })
      }
      axios({
        method: 'put',
        url: `/employee`,
        data: data
      })
        .then(() => {
          this.setState({
            successAdd: 'Профиль изменён',
          })
        })

    }



  }

  render () {
    return (
      <div className="container">
        <div className="profile_column">
          <div className="profile_info profile_name">
            <input ref={input => this.surnameInput = input}/>
            <input ref={input => this.forenameInput = input}/>
          </div>
          <div className="profile_img">
            <img className="user_photo" src={current_user} alt="Нет фото"/>
          </div>
          <div>
          <input className="profile_photo"
                 type="file"
                 accept="image/*"
                 placeholder='Изменить фото'
                 onChange={this.changePhoto}/>
          </div>
          <div className="profile_info">
            <p>Ваш номер телефона :</p>
            <InputMask
              mask="+38 (999) 999 99 99"
              inputRef={inputTel => this.phoneNumberInput = inputTel}
              alwaysShowMask={true}
              placeholder='Телефон'
            />
            <InputMask
              style={{display: "none"}}
              mask="+38 (999) 999 99 99"
              inputRef={inputTel => this.phoneNumberInputHide = inputTel}
              value={this.props.employee.employee.phoneNumber}
            />
            <p>Ваш e-mail :</p>
            <input
              type="email"
              ref={input => this.mailInput = input}
            />
            <p>Ваш логин :</p>
            <input
              name="u_login"
              ref={input => this.loginInput = input}
            />
            <p>Введите ваш старый пароль :</p>
            <input
              name="u_password"
              type="password"
            />
            <p>Введите новый пароль :</p>
            <input
              name="u_password"
              type="password"
            />
          </div>
          <button onClick={this.updateProfile} className="button_save">сохранить</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    employee: state.startData.currentUser,
  }
};
export default connect(mapStateToProps)(Profile)