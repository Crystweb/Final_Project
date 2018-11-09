import React, { Component } from 'react'
import '../../styles/Profile.css'
import current_user from '../../img/current_user.png'
import connect from "react-redux/es/connect/connect";
import axios from "axios";

class Profile extends Component {

  constructor (props) {
    super(props)

    this.surnameInput = React.createRef()
    this.forenameInput = React.createRef()
    this.phoneNumberInput = React.createRef()
    this.mailInput = React.createRef()
    this.loginInput = React.createRef()
    this.state = {
      profilePhoto: null,
      surname: null,
      forename: null,
      phoneNumber: null,
      mail: null,
      login: null,
      sendingData: false
    }
  }

  componentDidMount () {
    const {employee} = this.props.employee
    const sec = this.props.employee
    if (employee) {
      this.setState({
        surname: employee.surname,
        forename: employee.forename,
        phoneNumber: employee.phoneNumber,
        mail: employee.mail,
        login: sec.login
      })
    }
  }

  inputSurname (event) {
    this.setState({
      surname: event.target.value,
    })
  }

  inputForname (event) {
    this.setState({
      forename: event.target.value,
    })
  }

  inputPhonenumber (event) {
    this.setState({
      phoneNumber: event.target.value,
    })
  }

  inputMail (event) {
    this.setState({
      mail: event.target.value,
    })
  }

  inputLogin (event) {
    this.setState({
      login: event.target.value,
    })
  }

  changePhoto = (event) => {
    this.setState({profilePhoto: event.target.files[0]})
  }

  updateProfile = () => {
    const {surnameInput} = this
    const {forenameInput} = this
    const {phoneNumberInput} = this
    const {mailInput} = this
    const {loginInput} = this
    const {profilePhoto,sendingData} = this.state
    // const {employee} = this.props
    let body = {
      surname: surnameInput.value,
      forename: forenameInput.value,
      phoneNumber: phoneNumberInput.value,
      mail: mailInput.value,
      login: loginInput.value
    }
    let formData = new FormData()
    formData.append('task', JSON.stringify(body))
    if (profilePhoto) {
      formData.append('file', profilePhoto)
    }
    if (!sendingData) {
      this.setState({sendingData: true})
      axios({
        method: 'post',
        url: `/employee`,
        data: formData
      })
        .then(() => {
          this.setState({
            successAdd: 'Профиль изменён',
            sendingData: false
          })
        })
    }
  }

  render () {
    // const {surname} = this.props;
    // let variableSurname = []
    // /* eslint-disable */
    // surname.map(surname => {
    //   variableSurname.push({value: surname, label: surname})
    // })
    // /* eslint-enable */
    //
    // const inputSurname =
    //   <h1
    //     className="taskFactory__select"
    //     defaultValue='0'
    //     onChange={value => this.setState({surname: value.value})}
    //     options={variableSurname}
    //     placeholder="Повторяемость"
    //   />

    console.log(this.props)
    return (
      <div className="container">
        <div className="profile_column">
          <div className="profile_info">
            <input value={this.state.surname} ref={input => this.surnameInput = input}/>&nbsp;<input value={this.state.forename} ref={input => this.forenameInput = input}/>
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
            <input name="u_phone" type="tel" value={this.state.phoneNumber} ref={input => this.phoneNumberInput = input}/>
            <p>Ваш e-mail :</p>
            <input name="u_mail" type="email" value={this.state.mail} ref={input => this.mailInput = input}/>
            <p>Ваш логин :</p>
            <input name="u_login" value={this.state.login} ref={input => this.loginInput = input}/>
            <p>Введите ваш старый пароль :</p>
            <input name="u_password"/>
            <p>Введите новый пароль :</p>
            <input name="u_password"/>
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