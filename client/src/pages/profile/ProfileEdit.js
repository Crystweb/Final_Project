import React, { Component } from 'react'
import '../../styles/Profile.css'
import current_user from '../../img/current_user.png'
import connect from "react-redux/es/connect/connect";
import axios from "axios";

class Profile extends Component {

  constructor (props) {
    super(props)
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
    const {employee} = this.props.match.params
    if (employee) {
      this.setState({
        surname: employee.employee.surname,
        forename: employee.employee.forename,
        phoneNumber: employee.employee.phoneNumber,
        mail: employee.employee.mail,
        login: employee.login
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
    const {profilePhoto,sendingData} = this.state
    const {employee} = this.props
    let body = {
      surname: employee.surname.value,
      forename: employee.forename.value,
      phoneNumber: employee.phoneNumber.value,
      mail: employee.mail.value
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
    return (
      <div className="container">
        <div className="profile_column">
          <div className="profile_title">
            <h1 defaultValue={this.inputSurname}>&nbsp;</h1><h1 defaultValue={this.inputForname}/>
          </div>
          <div className="profile_img">
            <img className="user_photo" src={current_user} alt="Нет фото"/>
          </div>
          <div>
          <input className="profile_photo"
                 type="file"
                 accept="image/*"
                 onChange={this.changePhoto}>Изменить фото</input>
          </div>
          <div className="profile_info">
            <p>Ваш номер телефона :</p>
            <input name="u_phone" type="tel" defaultValue={value => this.setState({phoneNumber: value.value})}/>
            <p>Ваш e-mail :</p>
            <input name="u_mail" type="email" defaultValue={value => this.setState({mail: value.value})}/>
            <p>Ваш логин :</p>
            <input name="u_login" defaultValue={value => this.setState({login: value.value})}/>
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
debugger;
export default connect(mapStateToProps)(Profile)