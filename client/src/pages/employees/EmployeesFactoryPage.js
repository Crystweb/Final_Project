import React, {Component, Fragment} from 'react'
import axios from 'axios'
import connect from "react-redux/es/connect/connect";
import Select from 'react-select'

class EmployeesFactoryPage extends Component {

  constructor(props) {
    super(props)
    this.positionId = React.createRef()
    this.forename = React.createRef()
    this.surname - React.createRef()
    this.patronymic - React.createRef()
    this.phoneNumber - React.createRef()
    this.info - React.createRef()

    this.state = {
      toUpdate: false,
      successAction: '',
      forenameError: null,
      surnameError: null,
      positionIdError: null,
      sendingData: false
    }
  }

  createEmployee = () => {
    const {toUpdate, sendingData} = this.state
    const {positionId, forename, surname} = this

    if (!positionId || isNaN(positionId - 1)) {
      this.setState({
        positionIdError: 'Выберите позицию'
      })
    }
    if (!forename.value) {
      this.setState({
        forenameError: 'Введите имя'
      })
    }
    if (!surname.value) {
      this.setState({
        surnameError: 'Введите фамилию'
      })
    }
    if (!sendingData && positionId && forename.value && surname.value) {
      this.setState({sendingData: true})
      axios({
        url: `/employee`,
        method: toUpdate ? 'PUT' : 'POST',
        data: toUpdate ? {
          position: this.props.positions.find(p => p.id === +this.positionId),
          forename: this.forename.value,
          surname: this.surname.value,
          patronymic: this.patronymic.value,
          phoneNumber: this.phoneNumber.value,
          info: this.info.value
        } : {
          position: this.props.positions.find(p => p.id === +this.positionId),
          forename: this.forename.value,
          surname: this.surname.value,
          patronymic: this.patronymic.value,
          phoneNumber: this.phoneNumber.value,
          info: this.info.value
        }
      })
        .then((response) => this.setState({
          successAction: toUpdate ? 'Данные сотрудника изменены' : 'Создан новый сотрудник',
          sendingData: false
        }))
        .then(() => this.props.history.push('/employees/list'))
    }
  }

  componentWillMount() {
    const item = this.props.location.state;

    if (item) {
      this.forename = item.forename
      this.surname = item.surname
      this.patronymic = item.patronymic
      this.positionId = item.position.id
      this.phoneNumber = item.phoneNumber
      this.info = item.info

      this.setState({
        toUpdate: true
      })
    }
  }


  render() {
    const {forename, surname, patronymic, positionId, phoneNumber, info} = this.state;
    const {positions} = this.props;

    const styles = {
      dropdownIndicator: (base, state) => ({
      }),
      placeholder: (base, state) => ({
      }),
      valueContainer: (base, state) => ({
      }),
      control: (base, state) => ({
      }),
      indicatorsContainer: (base, state) => ({
      }),
      input: (base, start) => ({
        display: "none"
      })
    }

    let options = []

    positions.map(position =>
      options.push({value: position.id, label: position.title})
    )

    let placeholder = options[0].label

    let positionSelect = <Select
      className="vacancy__select"
      classNamePrefix="react-select"
      styles={styles}
      options={options}
      onChange={value => this.positionId = value.value }
      placeholder={"Позиция"}
    />

    return (
      <Fragment>
        <div>
            <div
              className="employee-form">
              <div className='employee-wrapp'>
                <div className='employee--m'>
                <input
                  className="vacancy__salary"
                  type="text"
                  placeholder='Имя'
                  defaultValue={forename}
                  ref={input => this.forename = input}/>
                {this.state.forenameError &&
                <label className='taskFactory__errorText'>{this.state.forenameError}</label>}
                </div>
                <div className='employee--m'>
                <input
                  className="vacancy__salary"
                  type="text"
                  placeholder='Фамилия'
                  defaultValue={surname}
                  ref={input => this.surname = input}/>
                {this.state.surnameError &&
                <label className='taskFactory__errorText'>{this.state.surnameError}</label>}
                </div>
                <input
                  className="vacancy__salary employee-m"
                  type="text"
                  placeholder='Отчество'
                  defaultValue={patronymic}
                  ref={input => this.patronymic = input}/>
              <div className="taskFactory__wrap-select employee--m">
                {positionSelect}
                {this.state.positionIdError &&
                <label className='taskFactory__errorText'>{this.state.positionIdError}</label>}
              </div>
                <input
                  className="vacancy__salary employee-m"
                  type="text"
                  placeholder='Телефон'
                  defaultValue={phoneNumber}
                  ref={input => this.phoneNumber = input}/>
              </div>
                <div className="newComment-wrap-textarea">
                  <textarea
                    className="newComment-textarea"
                    defaultValue={info} placeholder={'Введите Ваш коментарий'}
                    ref={input => this.info = input}/>
                </div>
              <div className="taskFactory__btns">
                <button className="newComment-send"
                        onClick={this.createEmployee}
                        value={this.props.location.state ? "Изменить данные" : "Добавить сотрудника"}>
                  {this.props.location.state ? "Изменить данные" : "Добавить сотрудника"}
                </button>
              </div>
            </div>
        </div>
        <p>{this.state.successAction}</p>
      </Fragment>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    positions: startData.positions
  }
};

export default connect(mapStateToProps)(EmployeesFactoryPage)
