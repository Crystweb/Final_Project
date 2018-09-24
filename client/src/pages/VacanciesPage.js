import React, { Component, Fragment } from 'react'
import Modal from 'react-responsive-modal'
import axios from 'axios'
import '../styles/VacanciesPage.css'
import {connect} from "react-redux";
import {getAllVacancies} from "../actions/actions";
import Preloader from "../components/Preloader";

class VacanciesPage extends Component {

  onOpenModal = () => {
    this.setState({open: true})
  }

  onCloseModal = () => {
    this.setState({open: false})
  }

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
        .then(() =>  this.props.GetAllVacancies())
  };

  constructor (props) {
    super(props)
    this.state = {
      position: this.props.positions[0].id,
      salary: '',
      info: '',
      open: false,
      positions: this.props.positions,
      data: [],
      newVac: {},
      showClosed: false,
      vacancies: {}
    }

    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this)
  }

  componentWillMount() {
    const {GetAllVacancies} = this.props
    let data = this.props.vacancies

    GetAllVacancies();
    this.setState({vacancies:data})
  }

  componentDidMount() {
    const {GetAllVacancies} = this.props
    let data = this.props.vacancies

    GetAllVacancies();
    this.setState({vacancies:data})
  }

  handlePositionChange (event) {
    event.preventDefault();
    this.setState({position: event.target.value})
  }

  handleSalaryChange (event) {
    event.preventDefault();
    this.setState({salary: event.target.value})
  }

  handleInfoChange (event) {
    event.preventDefault();
    this.setState({info: event.target.value})
  }

  render () {
    const {data, showClosed} = this.state
    const {vacancies} = this.props
    let toFilterVacancies = vacancies
    const {open, positions} = this.state
    if (!data) {
      return <Preloader/>
    }

    if (!showClosed) {
      toFilterVacancies = vacancies.filter(vacancy => vacancy.status === "OPENED")
    } else {toFilterVacancies = vacancies.filter(vacancy => vacancy.status === "CLOSED")}

    return (
      <Fragment>
        <h2 className="button-container">{`${showClosed ? 'Закрытые' : 'Открытые'}`} вакансии</h2>
        <div className="button-container" id="button">
          <button onClick={() => this.setState({showClosed: !showClosed})}>
            {`${showClosed ? 'Скрыть' : 'Показать'}`} закрытые вакансии
          </button>
          <button onClick={this.onOpenModal}>Добавить вакансию</button>
          <Modal open={open} onClose={this.onCloseModal} center
            closeOnOverlayClick={true}>
            <form onSubmit={this.handleSubmit}>
              <label>
                Название должности:
                <select onChange={this.handlePositionChange}>
                    {positions.map(position =>
                        <option type="text" name={'position'} key={position.id} value={position.id}>
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
          </Modal>
        </div>
        <div>
          {toFilterVacancies.map(vacancy =>
            <ul key={vacancy.id} className='vacancyList'>
              <li>
                <h3>{vacancy.position}</h3>
              </li>
              <li>
                <h4>{vacancy.info}</h4>
              </li>
              <li>
                <h5>{vacancy.status}</h5>
              </li>
              <li>
                <h5>{vacancy.salary}</h5>
              </li>
              <li>
                <h5>{new Date(vacancy.publication).toDateString()}</h5>
              </li>
            </ul>
          )}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, startData) => {
  return {
    vacancies: state.vacancies,
    positions: state.startData.positions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllVacancies: () => dispatch(getAllVacancies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacanciesPage)
