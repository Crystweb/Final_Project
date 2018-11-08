import React, { Component, Fragment } from 'react'
import '../../styles/VacanciesPage.css'
import { connect } from 'react-redux'
import { getAllVacancies } from '../../actions/actions'
import Preloader from '../../components/Preloader'
import { withStyles } from '@material-ui/core/styles'
import vacancyStyles from '../../constants/vacancyStylesJSS'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import picture from "../../img/add.png";
import update from "../../img/edit.png";
import trash from "../../img/delete.png";
import Point from '../../components/Point'

import axios from 'axios'

class VacanciesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: this.props.positions[0].id,
      salary: '',
      info: '',
      showClosedVacancies: false
    }
  }

  componentWillMount () {
    this.props.getAllVacancies()
  }

  deleteVacancy (id) {
    if (window.confirm('Вы уверены, что хотите удалить вакансию?')) {
      axios.delete(`/vacancy/${id}`)
        .then(() => this.props.getAllVacancies())
    }
  }

  render () {
    const {showClosedVacancies} = this.state
    const {vacancies, classes, positions, currentUser} = this.props
    const id = currentUser.employee.id
    let toFilterVacancies = []

    if (!showClosedVacancies) {
      toFilterVacancies = vacancies.filter(vacancy => vacancy.status === 'OPENED')
    } else {
      toFilterVacancies = vacancies.filter(vacancy => vacancy.status === 'CLOSED')
    }

    if (!toFilterVacancies) {
      return <Preloader/>
    } else {
      return (
        <Fragment>
          <div className="radioANDbuttons">
            <ul className="position-radio-buttons"
                aria-label={showClosedVacancies}
                value={toString(showClosedVacancies)}
                >
              <li className="position-radio-buttons__elem">
                <label onClick={() => this.setState({showClosedVacancies: false})}>
                  <input name="position"
                         type='radio'
                         defaultChecked={!showClosedVacancies}
                         value='d'
                        />
                  <div className="position-radio-buttons__fakeBtn">
                    <div className="position-radio-buttons__fakeBtn-active"></div>
                  </div>
                  <span>открытые вакансии</span>
                </label>
              </li>
              <li className="position-radio-buttons__elem">
                <label onClick={() => this.setState({showClosedVacancies: true})}>
                  <input name="position"
                         type='radio'
                         defaultChecked={showClosedVacancies}
                         value='d'
                  />
                  <div className="position-radio-buttons__fakeBtn">
                    <div className="position-radio-buttons__fakeBtn-active"></div>
                  </div>
                  <span>закрытые вакансии</span>
                </label>
              </li>
            </ul>
            <div className="add_and_history add_and_history--alone">
              <Link to={routes.addNewVacancy.href}>
                <img alt="add comment" src={picture}/>
              </Link>
            </div>
          </div>
          <div className="vacancy-list">
            {toFilterVacancies.map(vacancy => {
              return <li className="comment-list__elem"
                      key={vacancy.id}>
                <Point/>
                <h3 className="comment-list__elem-title">
                  {positions.find(position => position.id === vacancy.position.id).title}
                </h3>
                <h4 className="comment-list__elem-subtitle">
                  {new Date(vacancy.publication).toDateString()}
                </h4>
                <p className="comment-list__elem-info">
                  {vacancy.salary}
                </p>
                <p className="comment-list__elem-info">
                  {vacancy.info}
                </p>


                  <button onClick={() => this.deleteVacancy(vacancy.id)} className={classes.buttons}>
                      <img alt="trash" src={trash}/>
                  </button>

                  <button className={classes.buttons}>
                      <Link to={{pathname: routes.updateVacancy.href + vacancy.id, state: vacancy}}>
                          <img alt="update" src={update}/>
                      </Link>
                  </button>

              </li>
            })}
          </div>
        </Fragment>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllVacancies: () => dispatch(getAllVacancies())
  }
}

const mapStateToProps = (state) => {
  return {
    vacancies: state.vacancies,
    positions: state.startData.positions,
    currentUser: state.startData.currentUser
  }
}

export default withStyles(vacancyStyles)(connect(mapStateToProps, mapDispatchToProps)(VacanciesPage))
