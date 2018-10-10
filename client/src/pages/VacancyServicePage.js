import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Preloader from '../components/Preloader'

class VacancyServicePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      positionId: this.props.positions[0].id,
      status: 'CLOSED',
      salary: '',
      info: '',
      publication: null,
      toUpdate: false,
      successAction: ''
    };

    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  handleSubmit = (event) => {
    const toUpdate = this.state.toUpdate;
    event.preventDefault();
    axios({
      url: '/vacancy',
      method: toUpdate ? 'PUT' : 'POST',
      data: toUpdate ? {
          id: this.state.id,
          positionId: this.state.positionId,
          info: this.state.info,
          salary: this.state.salary,
          status: this.state.status,
          publication: this.state.publication
        }
        : {
          positionId: this.state.positionId,
          info: this.state.info,
          salary: this.state.salary
        },
    })
      .then((response) => this.setState({
        resData: response.data,
        successAction: toUpdate ? 'Вакансия изменена успешно' : 'Создана новая вакансия'
      }))
  };

  handlePositionChange(event) {
    event.preventDefault();
    this.setState({positionId: event.target.value})
  }

  handleStatusChange(event) {
    event.preventDefault();
    this.setState({status: event.target.value})
  }

  handleSalaryChange(event) {
    event.preventDefault();
    this.setState({salary: event.target.value})
  }

  handleDescriptionChange(event) {
    event.preventDefault();
    this.setState({info: event.target.value})
  }

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
        toUpdate: true,
        successAction: ''
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
            <select onChange={this.handlePositionChange} defaultValue={positionId}>
              {positions.map(position =>
                <option name={'positionId'} key={position.id} value={position.id}>
                  {position.title}
                </option>)}
            </select>
            {toUpdate &&
            <p> Status: </p>}
            {toUpdate && <select onChange={this.handleStatusChange} defaultValue={status}>
              <option name={'status'} key='1' value='OPENED'> OPENED</option>
              <option name={'status'} key='2' value='CLOSED'> CLOSED</option>
            </select>}
            Зарплата:
            <input type="text" name={'salary'} value={salary}
                   onChange={this.handleSalaryChange}/>
            Описание вакансии:
            <textarea rows="5" placeholder={'Введите Ваш коментарий'} name={'info'} value={info}
                      onChange={this.handleDescriptionChange}/>
          </label>
          <input type="submit" onClick={() => setTimeout(() => this.props.history.push('/employees/vacancies'), 2000)} value={this.props.location.state ? "Изменить вакансию" : "Добавить вакансию"}/>
        </form>
        <p>{this.state.successAction}</p>
      </div>
    )
  }
}

const mapStateToProps = ({vacancies, startData}, ownProps) => {
  return {
    positions: startData.positions,
    updateVacancy: vacancies.find(vacancy => vacancy.id === +ownProps.match.params.vacancyId)
  }
};

export default connect(mapStateToProps)(VacancyServicePage)