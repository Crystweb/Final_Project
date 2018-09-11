import React, { Component } from 'react'
import '../styles/VacanciesList.css'
import axios from 'axios'
import Preloader from './Preloader'

class VacanciesList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      date: []
    }
  }

  componentWillMount () {
    axios.get('/vacancy')
      .then(response => this.setState({date: response.data}))
  }

  render () {
    const {date} = this.state
    if (!this.state.date) {
      return (
        <div>
          <Preloader/>
        </div>
      )
    } else {
      return (
        <div>
          Список вакансий:
          {date.map(vacancy =>
            <ul className='vacancyList'>
              <li>
                <h3>{vacancy.position}</h3>
              </li>
              <li>
                <h4>{vacancy.info}</h4>
              </li>
              <li>
                <h5>{vacancy.status}</h5>
              </li>
            </ul>
          )}
        </div>
      )
    }
  }
}

export default VacanciesList
