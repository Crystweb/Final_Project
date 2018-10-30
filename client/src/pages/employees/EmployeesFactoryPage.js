import React, {Component, Fragment} from 'react'
import axios from 'axios'
import connect from "react-redux/es/connect/connect";

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

    return (
      <Fragment>
        <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Forename:
                <input type="text" defaultValue={forename} ref={(input) => this.forename = input}/>
                Surname:
                <input type="text" defaultValue={surname} ref={(input) => this.surname = input}/>
                Patronymic:
                <input type="text" defaultValue={patronymic} ref={(input) => this.patronymic = input}/>
                Должность:
                <select defaultValue={positionId} ref={(input) => this.positionId = input}>
                  {positions.map(position =>
                    <option key={position.id} value={position.id}>{position.title}</option>)}
                </select>
                Phone number:
                <input type="text" defaultValue={phoneNumber} ref={(input) => this.phoneNumber = input}/>
                Коментарий:
                <textarea defaultValue={info} placeholder={'Введите Ваш коментарий'} ref={(input) => this.info = input}/>
              </label>
              <input type="submit" onClick={() => setTimeout(() => this.props.history.push('/employees/list'), 2000)}
                     value={this.props.location.state ? "Изменить данные" : "Добавить сотрудника"}/>
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
