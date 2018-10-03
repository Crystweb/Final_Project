import React, {Component, Fragment} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Preloader from '../components/Preloader'

class VacancyServicePage extends Component {

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: '/vacancy',
      method: 'POST',
      data: {
        positionId: this.state.position,
        info: this.state.info,
        salary: this.state.salary
      }
    })
      .then((response) => this.setState({open: false, resData: response.data}))
  }

  constructor (props) {
    super(props)
    this.state = {
      position: this.props.positions[0].id,
      data: [],
      vacancyForUpdate: this.props.updateVacancy || null
    }

    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleSalaryChange = this.handleSalaryChange.bind(this)
    this.handleInfoChange = this.handleInfoChange.bind(this)
  }

  handlePositionChange(event) {
    event.preventDefault()
    this.setState({position: event.target.value})
  }

  handleSalaryChange(event) {
    event.preventDefault()
    this.setState({salary: event.target.value})
  }

  handleInfoChange(event) {
    event.preventDefault()
    this.setState({info: event.target.value})
  }

  render () {
    const {positions} = this.props
    const {vacancyForUpdate} = this.state

    if (!positions) <Preloader/>
    else if (vacancyForUpdate == null) {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label>
              Название должности:
              <select onChange={this.handlePositionChange}>
                {positions.map(position =>
                  <option name={'position'} key={position.id} value={position.id}>
                    {position.title}
                  </option>)}
              </select>
              Зарплата:
              <input type="text" name={'salary'} value={this.state.salary}
                     onChange={this.handleSalaryChange}/>
              <br/>
              <textarea placeholder={'Введите Ваш коментарий'} name={'info'} value={this.state.info}
                        onChange={this.handleInfoChange}/>
            </label>
            <input type="submit" value="Добавить"/>
          </form>
          <p>{this.state.errorCheckedPosition || this.state.errorText}</p>
          <p>{this.state.successPost}</p>
        </div>
      )
    }
    else if (vacancyForUpdate !== null){
      return (
        <Fragment>
          <h1>НИХЕРА пока НЕ ГОТОВО :))</h1>
          <h2>ВСЕ ЗАВТРА :))</h2>
        </Fragment>
        )
    }
  }
}

const mapStateToProps = ({vacancies, startData}, ownProps) => {
    return {
      positions: startData.positions,
      updateVacancy: vacancies.find(vacancy => vacancy.id === +ownProps.match.params.vacancyId)
    }
}

export default connect(mapStateToProps)(VacancyServicePage)
