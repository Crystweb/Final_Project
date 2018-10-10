import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import 'react-datepicker/dist/react-datepicker.css'
import * as _ from 'lodash'
import '../../styles/Tasks.css'
import {addEmployee, addNewEmployee} from '../../actions/actions'
import axios from "axios";

class CreateNewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      position: null,
      forename: null,
      surname: null,
      phoneNumber: null,
      info: null,
      photo: null,
      errorPosition: null,
      errorForename: null,
      errorSurname: null,
      errorPhoneNumber: null,
      successAdd: null
    };

    this.choosePosition = this.choosePosition.bind(this);
    this.inputForename = this.inputForename.bind(this);
    this.inputSurname = this.inputSurname.bind(this);
    this.inputPhoneNumber = this.inputPhoneNumber.bind(this);
    this.inputInfo = this.inputInfo.bind(this);
    this.makePhoto = this.makePhoto.bind(this);
    this.createEmployee = this.createEmployee.bind(this)
  }

  choosePosition = (event) => {
    this.setState({
      chosenPosition: event.target.value,
      errorPosition: null
    })
  };

  inputForename = (event) => {
    this.setState({
      inputForename: event.target.value,
      errorForename: null
    })
  };

  inputSurname = (event) => {
    this.setState({
      inputSurname: event.target.value,
      errorSurname: null
    })
  };

  inputPhoneNumber = (event) => {
    this.setState({
      inputPhoneNumber: event.target.value,
      errorPhoneNumber: null
    })
  };

  inputInfo = (event) => {
    this.setState({
      inputInfo: event.target.value,
    })
  };

  makePhoto = (event) => {
       this.setState({photo: event.target.files[0]})
  }

  createEmployee = () => {
    const {chosenPosition, inputForename, inputSurname, inputPhoneNumber, photo} = this.state;
    if (_.isEmpty(chosenPosition)) {
      this.setState({
        errorPosition: 'Выберите '
      })
    }

    if (_.isEmpty(inputForename)) {
      this.setState({
        errorForename: 'Введите имя'
      })
    }

    if (_.isEmpty(inputSurname)) {
      this.setState({
        errorSurname: 'Введите фамилию'
      })
    }

    if (_.isEmpty(inputPhoneNumber)) {
      this.setState({
        errorPhoneNumber: 'Введите номер телефона'
      })
    }

    if (!_.isEmpty(chosenPosition) && !_.isEmpty(inputForename) && !_.isEmpty(inputSurname) && !_.isEmpty(inputPhoneNumber)) {
    let body = {
      positions: [this.props.positions.find(position => position.id === +chosenPosition)],
      forename: inputForename,
      surname : inputSurname,
      phoneNumber : inputPhoneNumber,
  };

  let formData = new FormData();
  formData.append('employee', JSON.stringify(body));
  if (photo) {
    formData.append('file', photo)
  }
  axios({
          method: 'post',
          url: `/employee`,
  data: formData
})
.then((response) => this.props.addEmployee(response.data))
  .then(() => {
    this.setState({
      successAdd: 'Сотрудник добавлен'
    })
  })
  .then(() => { setTimeout(() => this.props.history.push('/employee'), 1500) })
}
};

  render() {
    const {user, employee} = this.props;
    if (user && employee) {
      return (
        <Fragment>
          <div className="button-container" id="button">
                <label>
                  Position:
                  <input type="text" name={"position"} value={this.state.position}
                         onChange={this.choosePosition}/>
                  Forename:
                  <input type="text" name={"forename"} value={this.state.forename}
                         onChange={this.inputForename}/>
                  Surname:
                  <input type="text" name={"surname"} value={this.state.surname}
                         onChange={this.inputSurname}/>
                  Phone number:
                  <input type="text" name={"phoneNumber"} value={this.state.phoneNumber}
                         onChange={this.inputPhoneNumber}/>

                  <br/>
                  <textarea placeholder={'Введите Ваш коментарий'} name={"info"} value={this.state.info}
                            onChange={this.inputInfo}/>
                </label><br/>
                <button
                  onClick={this.createEmployee}>Создать
                </button>
                {this.state.successAdd && <h3>{this.state.successAdd}</h3>}
          </div>
        </Fragment>
      )
    } else {
      return (
        <Preloader/>
      )
    }
  }
}
const mapStateToProps = ({employees, startData}) => {
    return {
        employee: employees.employeesList,
        user: startData.currentUser,
        // position: employees.employeesList.position.title,
        forename: employees.forename,
        surname: employees.surname,
        phoneNumber: employees.phoneNumber,
        info: employees.info,
    }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//       AddEmployee: (data) => {
//         dispatch(addEmployee(data))
//     }
//   }
// }

export default connect(mapStateToProps)(CreateNewEmployee)