import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'
import connect from 'react-redux/es/connect/connect'
import axios from 'axios/index'
import { addChecKHistory, addSelectedDateFromCalendar } from '../../actions/actions'

class CheckInHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      floorId: this.props.floors[0].id
    }
  }

  chooseFloor (event) {
    this.setState({
      floorId: event.target.value
    })
  }

  componentDidMount () {
    if (this.props.date) {
      axios.get('/check-in', {
        params: {
          date: this.props.date
        }
      })
        .then(response => this.props.roomCheckHistory(response.data))
    }
  }

  render () {
    if (!this.props.date) {
      let today = new Date()
      let sixMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 180)
      return (
        <div className='container calendar'>
          <Calendar
            max={today}
            min={sixMonthAgo}
            selected={today}
            minDate={sixMonthAgo}
            maxDate={today}
            isForCheckIn={true}
          />
        </div>
      )
    }

    const addCheckIn = () => {
      if (this.props.date) {
        axios.get('/check-in', {
          params: {
            date: this.props.date
          }
        })
          .then(response => this.props.roomCheckHistory(response.data))
      }
    }
    addCheckIn()
    if (this.props.сheckInForSelectedDate) {
      const {floors, сheckInForSelectedDate} = this.props
      const currentFloor = floors.find(floor => floor.id = this.state.floorId)
      const checkForCurrentFloor = сheckInForSelectedDate
        .filter(check => currentFloor.children.some(child => child.id === check.location.id))
      const floorChoice = (
        <div>
          <select
            onChange={this.chooseFloor.bind(this)}
            defaultValue={2}
          >
            {floors && floors.map(location => {
              return <option
                key={location.id}
                className='floors__item'
                value={location.id}>
                {location.title}
              </option>
            })}
          </select>
        </div>
      )
      return (
        <div>
          {floorChoice}
          <div>

          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({checkIn, startData}) => {
  return {
    сheckInForSelectedDate: checkIn.roomCheckHistory,
    floors: startData.locations.filter(location => location.children.length > 0)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roomCheckHistory: (data) => {
      dispatch(addChecKHistory(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInHistory)
