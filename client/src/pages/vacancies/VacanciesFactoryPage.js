import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import {getAllVacancies} from "../../actions/actions";

class VacanciesFactoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toUpdate: false,
      successAction: ''
    };


  }

  handleSubmit = (event) => {
    const toUpdate = this.state.toUpdate;
 debugger
    event.preventDefault();
    axios({
      url: '/vacancy',
      method: toUpdate ? 'PUT' : 'POST',
      data: toUpdate ? {
            id: this.state.id,
            positionId: this.positionId.value,
            info: this.info.value,
            salary: this.salary.value,
            status: this.status.value,
            publication: this.state.publication
          }
      : {
      positionId: this.positionId.value,
      info: this.info.value,
      salary: this.salary.value
      },
    })
      .then((response) => this.setState({
        successAction: toUpdate ? 'Вакансия изменена успешно' : 'Создана новая вакансия'}))
  };

  componentWillMount() {
    const item = this.props.location.state;

    if (item) {
      this.setState({
        id: item.id,
        positionId: item.positionId,
        status: item.status,
        salary: item.salary,
        info: item.info,
        publication: item.publication,
        toUpdate: true
      })
    }
  }

  render() {
    const {positions} = this.props;
    const {positionId, status, salary, info, toUpdate} = this.state;

    if (!positions) {
      return <Preloader/>
    } else return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Название должности:
            <select ref={(input) => this.positionId = input} defaultValue={positionId}>
              {positions.map(position =>
                <option key={position.id} value={position.id}>
                  {position.title}
                </option>)}
            </select>
            {toUpdate &&
            <p> Status: </p>}
            {toUpdate && <select ref={(input) => this.status = input} defaultValue={status}>
              <option key='1' value='OPENED'> OPENED</option>
              <option key='2' value='CLOSED'> CLOSED</option>
            </select>}
            Зарплата:
            <input type="text" ref={(input) => this.salary = input} defaultValue={salary}/>
            Описание вакансии:
            <textarea rows="5" placeholder={'Введите Ваш коментарий'} ref={(input) => this.info = input} defaultValue={info}/>
          </label>
          <input type="submit" onClick={() => setTimeout(() => this.props.history.push('/employees/vacancies'), 1000)}
                 value={this.props.location.state ? "Изменить вакансию" : "Добавить вакансию"}/>
        </form>
        <p>{this.state.successAction}</p>
      </div>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    positions: startData.positions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateVacancy: () => dispatch(updateVacancy()),
    // addNewVacancy: () => dispatch(addNewVacancy()),
    getAllVacancies: () => dispatch(getAllVacancies()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VacanciesFactoryPage)