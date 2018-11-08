import React, {Component, Fragment} from 'react'
import axios from 'axios'
import connect from "react-redux/es/connect/connect";
import Select from 'react-select'
import InputMask from 'react-input-mask';

class EmployeesFactoryPage extends Component {

  constructor(props) {
    super(props)

    /* eslint-disable */
    this.positionId = React.createRef()
    this.patronymic - React.createRef()
    this.phoneNumber - React.createRef()
    this.info - React.createRef()
    /* eslint-enable */

    this.state = {
      toUpdate: false,
      successAction: '',
      forename: null,
      surname: null,
      forenameError: null,
      surnameError: null,
      positionIdError: null,
      sendingData: false
    }
  }

  createEmployee = () => {
    const {toUpdate, sendingData, forename, surname} = this.state
    const {positionId} = this

    if (!positionId || isNaN(positionId - 1)) {
      this.setState({
        positionIdError: 'Выберите позицию'
      })
    }
    if (!forename) {
      this.setState({
        forenameError: 'Введите имя'
      })
    }
    if (!surname) {
      this.setState({
        surnameError: 'Введите фамилию'
      })
    }
    if (!sendingData && positionId && forename && surname) {
      this.setState({sendingData: true})
      axios({
        url: `/employee`,
        method: toUpdate ? 'PUT' : 'POST',
        data: toUpdate ? {
          position: this.props.positions.find(p => p.id === +this.positionId),
          forename: forename,
          surname: surname,
          patronymic: this.patronymic.value,
          phoneNumber: this.phoneNumber.value,
          info: this.info.value
        } : {
          position: this.props.positions.find(p => p.id === +this.positionId),
          forename: forename,
          surname: surname,
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
      this.patronymic = item.patronymic
      this.positionId = item.position.id
      this.phoneNumber = item.phoneNumber
      this.info = item.info

      this.setState({
        toUpdate: true,
        forename: item.forename,
        surname: item.surname,
        patronymic: item.patronymic,
        positionId: item.position.id,
        phoneNumber: item.phoneNumber,
        info: item.info
      })
    }
  }


  render() {
    const {forename, surname, patronymic, info} = this.state;
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

    let positionSelect = <Select
      className="vacancy__select"
      classNamePrefix="react-select"
      styles={styles}
      options={options}
      onChange={value => {
        this.positionId = value.value
        this.setState({positionIdError: null})
      }}
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
                  onChange={event => this.setState({forename: event.target.value, forenameError: null})}
                />
                {this.state.forenameError &&
                <label className='taskFactory__errorText'>{this.state.forenameError}</label>}
                </div>
                <div className='employee--m'>
                <input
                  className="vacancy__salary"
                  type="text"
                  placeholder='Фамилия'
                  defaultValue={surname}
                  onChange={event => this.setState({surname: event.target.value , surnameError: null})}
                />
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
                <InputMask
                  className="vacancy__salary employee-m"
                  mask="+38 (999) 999 99 99"
                  inputRef={inputTel => this.phoneNumber = inputTel}
                  alwaysShowMask={false}
                  placeholder='Телефон'
                />
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
