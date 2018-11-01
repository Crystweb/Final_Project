import React, {Component, Fragment} from 'react'
import axios from 'axios'
import connect from "react-redux/es/connect/connect";
import Select from 'react-select'

class EmployeesFactoryPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toUpdate: false,
      successAction: ''
    }
  }

  handleSubmit = event => {
    const toUpdate = this.state.toUpdate
    event.preventDefault();
    axios({
      url: `/employee`,
      method: toUpdate ? 'PUT' : 'POST',
      data: toUpdate ? {
        position: this.props.positions.find(p => p.id === +this.positionId.value),
        forename: this.forename.value,
        surname: this.surname.value,
        patronymic: this.patronymic.value,
        phoneNumber: this.phoneNumber.value,
        info: this.info.value
      } : {
        position: this.props.positions.find(p => p.id === +this.positionId.value),
        forename: this.forename.value,
        surname: this.surname.value,
        patronymic: this.patronymic.value,
        phoneNumber: this.phoneNumber.value,
        info: this.info.value
      }
    })
      .then((response) => this.setState({
        successAction: toUpdate ? 'Данные сотрудника изменены' : 'Создан новый сотрудник'}))
  }

  componentWillMount() {
    const item = this.props.location.state;

    if (item) {
      this.setState({
        forename: item.forename,
        surname: item.surname,
        patronymic: item.patronymic,
        positionId: item.position.id,
        phoneNumber: item.phoneNumber,
        info: item.info,
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
      ref={(input) => this.positionId = input}
      defaultValue={positionId}
      placeholder={"" + placeholder}

    />

    return (
      <Fragment>
        <div>
            <form
              className="employee-form"
              onSubmit={this.handleSubmit}>
              <div className='employee-wrapp'>
                <input
                  className="vacancy__salary employee--m"
                  type="text"
                  placeholder='Имя'
                  defaultValue={forename}
                  ref={(input) => this.forename = input}/>
                <input
                  className="vacancy__salary employee--m"
                  type="text"
                  placeholder='Фамилия'
                  defaultValue={surname}
                  ref={(input) => this.surname = input}/>
                <input
                  className="vacancy__salary employee--m"
                  type="text"
                  placeholder='Отчество'
                  defaultValue={patronymic} ref={(input) => this.patronymic = input}/>
              <div className="taskFactory__wrap-select employee--m">
                {positionSelect}
              </div>
                <input
                  className="vacancy__salary employee--m"
                  type="text"
                  placeholder='Телефон'
                  defaultValue={phoneNumber}
                  ref={(input) => this.phoneNumber = input}/>
              </div>
                <div className="newComment-wrap-textarea">
                  <textarea
                    className="newComment-textarea"
                    defaultValue={info} placeholder={'Введите Ваш коментарий'} ref={(input) => this.info = input}/>
                </div>
              <div className="taskFactory__btns">
                <button className="newComment-send"
                        type="submit"
                        onClick={() => setTimeout(() => this.props.history.push('/employees/list'), 2000)}
                        value={this.props.location.state ? "Изменить данные" : "Добавить сотрудника"}>
                  {this.props.location.state ? "Изменить данные" : "Добавить сотрудника"}
                </button>
              </div>
            </form>
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
