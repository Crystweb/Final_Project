import React, {Component} from 'react'
import api from '../../services/Api'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import {getAllVacancies} from '../../actions/actions'
import Select from 'react-select'

class VacanciesFactoryPage extends Component {
  constructor (props) {
    super(props)
    this.salary = React.createRef()
    this.info = React.createRef()

    this.state = {
      toUpdate: false,
      successAction: '',
      id: null,
      positionId: null,
      status: null,
      publication: null,
      sendingData: false,
      positionIdError: null,
      infoError: null
    }
  }

  createVacancy = () => {
    const {toUpdate, sendingData, positionId} = this.state
    const {info} = this
    const {positions} = this.props

    if (!info.value) {
      this.setState({infoError: 'Введите информацию'})
    }
    if (!positionId || isNaN(positionId - 1)) {
      this.setState({positionIdError: 'Выберите позицию'})
    }
    if (!sendingData && positionId && info.value) {
      const data = toUpdate ? {
        id: this.state.id,
        position: positions.find(position => position.id === this.state.positionId),
        info: this.info.value,
        salary: this.salary.value,
        status: this.state.status.value,
        publication: this.state.publication
      }
        : {
          position: positions.find(position => position.id === this.state.positionId),
          info: this.info.value,
          salary: this.salary.value
        }
      toUpdate ? api.put('/vacancy', {data: data}) : api.post('/vacancy', {data: data})
        .then((response) => this.setState({
          successAction: toUpdate ? 'Вакансия изменена успешно' : 'Создана новая вакансия'
        }))
        .then(() => this.props.history.push('/employees/vacancies'))
    }
  };

  componentWillMount () {
    const item = this.props.location.state

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

  changeInfoError = (e) => {
    this.setState({infoError: null})
  }

  render () {
    const {positions} = this.props
    const {status, salary, info, toUpdate} = this.state

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
        display: 'none'
      })
    }

    let options = []

    positions.map(position =>
      options.push({value: position.id, label: position.title})
    )

    let positionSelect =
      <Select
        className="vacancy__select"
        classNamePrefix="react-select"
        styles={styles}
        options={options}
        onChange={value => this.setState({positionId: value.value, positionIdError: null})}
        placeholder={'Позиция'}
      />

    if (!positions) {
      return <Preloader/>
    } else {
      return (
        <div className="container vacancy__wrap">
          <div>
            <div className="vacancy__wrap-select">
              {positionSelect}
              {this.state.positionIdError && <p className="taskFactory__errorText">{this.state.positionIdError}</p>}
            </div>
            {toUpdate &&
            <p> Status: </p>}
            {toUpdate && <select ref={(input) => this.status = input} defaultValue={status}>
              <option key='1' value='OPENED'> OPENED</option>
              <option key='2' value='CLOSED'> CLOSED</option>
            </select>}
            <div className="vacancy__wrap-select">
              <input className="vacancy__salary"
                type="text"
                ref={(input) => this.salary = input}
                defaultValue={salary}
                placeholder="Зарплата"/>
            </div>
            <div className="vacancy__wrap-textarea">
              <textarea
                className="vacancy__textarea"
                rows="5"
                placeholder={'Привет друг, что бы ты хотел мне написать?'}
                ref={input => {
                  this.info = input
                }}
                onChange={this.changeInfoError}
                defaultValue={info}/>
            </div>
            <div className="vacancy__btns">
              {this.state.infoError && <label className="newComment-errorText" htmlFor='commentField'>{this.state.infoError}</label>}
              <button
                className="vacancy__create"
                onClick={this.createVacancy}
                value={this.props.location.state ? 'Изменить вакансию' : 'Добавить вакансию'}>
                {this.props.location.state ? 'Изменить вакансию' : 'Добавить вакансию'}
              </button>
            </div>
          </div>
          <p>{this.state.successAction}</p>
        </div>
      )
    }
  }
}

const mapStateToProps = ({startData}) => {
  return {
    positions: startData.positions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // updateVacancy: () => dispatch(updateVacancy()),
    // addNewVacancy: () => dispatch(addNewVacancy()),
    getAllVacancies: () => dispatch(getAllVacancies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacanciesFactoryPage)