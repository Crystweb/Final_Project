import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import 'react-datepicker/dist/react-datepicker.css'
import * as _ from 'lodash'
import '../../styles/Tasks.css'
import {addEmployee, addNewEmployee} from '../../actions/actions'

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

    this.handleChange = this.handleChange.bind(this);
    this.choosePosition = this.choosePosition.bind(this);
    this.inputForename = this.inputForename.bind(this);
    this.inputSurname = this.inputSurname.bind(this);
    this.inputPhoneNumber = this.inputPhoneNumber.bind(this);
    this.inputInfo = this.inputInfo.bind(this);
    // this.makePhoto = this.makePhoto.bind(this)
    this.createEmployee = this.createEmployee.bind(this)
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

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

  // makePhoto = (event) => {
  //      this.setState({photo: event.target.files[0]})
  // }

  createEmployee = () => {
    const {chosenPosition, inputForename, inputSurname, inputPhoneNumber} = this.state;
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
  };


  render() {
    const {user, employee} = this.props
    if (user && employee) {
      return (
        <Fragment>
          <div className="button-container" id="button">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Position:
                  <input type="text" name={"position"} value={this.state.position}
                         onChange={this.handlePositionChange}/>
                  Forename:
                  <input type="text" name={"forename"} value={this.state.forename}
                         onChange={this.handleForenameChange}/>
                  Surname:
                  <input type="text" name={"surname"} value={this.state.surname}
                         onChange={this.handleSurnameChange}/>
                  Phone number:
                  <input type="text" name={"phoneNumber"} value={this.state.phoneNumber}
                         onChange={this.handlePhoneNumberChange}/>

                  <br/>
                  <textarea placeholder={'Введите Ваш коментарий'} name={"info"} value={this.state.info}
                            onChange={this.handleInfoChange}/>
                </label><br/>
                <input type="submit" value="Добавить"/>
              </form>
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
        user: startData.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      AddEmployee: (data) => {
        dispatch(addEmployee(data))
    }
  }
}

export default connect(mapStateToProps)(CreateNewEmployee)