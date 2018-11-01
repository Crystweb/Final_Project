import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../styles/RoomCheckIn.css'
import routes from '../../constants/routes'
import Link from 'react-router-dom/es/Link'
import calendar from '../../img/calendar.png'

class RoomsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      floor: this.props.checkInLocations[0].id
    }
    this.chooseFloor = this.chooseFloor.bind(this)
  }

  chooseFloor (event) {
    this.setState({
      floor: event.target.value
    })
    console.log(this.state.floor)
  }

  render () {
    const {checkInLocations} = this.props
    const {floor} = this.state
    const chosenFloor = floor && checkInLocations.find(location => location.id === +floor).children
    return (
      <div className='floors'>
        <div className='floors__navigation'>
          <select
            onChange={this.chooseFloor}
            defaultValue={2}
          >
            {checkInLocations && checkInLocations.map(location => {
              return <option
                key={location.id}
                className='floors__item'
                value={location.id}>
                {location.title}
              </option>
            })}
          </select>
          <Link to={}>
            <img src={calendar} alt="calendar"/>
          </Link>
        </div>
        {floor &&
          <ul className='floors__rooms'>
            {chosenFloor.map(room => {
              return (
                <li
                  className='roomName'
                  key={room.id}
                  value={room.id}
                >
                  <Link
                    className='roomName__item'
                    to={routes.taskForRoom.href + room.id}
                  >
                    {room.title}
                  </Link>
                </li>
              )
            })
            }
          </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    checkInLocations: startData.locations.filter((location) => location.children.length > 0)
  }
}

export default connect(mapStateToProps)(RoomsList)
