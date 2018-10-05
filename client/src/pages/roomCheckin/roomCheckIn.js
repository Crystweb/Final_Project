import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../../styles/RoomCheckIn.css'

class RoomCheckIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      floor: null
    }
    this.chooseFloor = this.chooseFloor.bind(this)
  }

  chooseFloor (event) {
    this.setState({
      floor: event.target.value
    })
  }

  render () {
    const {checkInLocations} = this.props
    const {floor} = this.state
    const choosenFloor = floor && checkInLocations.find(location => location.id === +floor).children
    return (
      <Fragment>
        <div className='floors'>
          {checkInLocations && checkInLocations.map(location => {
            return <div
              key={location.id}
              className='floors__item'
              onChange={this.chooseFloor}
            >
              <input
                className='rooms'
                name='floor'
                type='radio'
                value={location.id}
              />
              <label htmlFor="floor">{location.title}</label>
            </div>
          })}
          {floor &&
          <ul className='floors__rooms'>
            {choosenFloor.map(room => {
              return (
                <li
                  key={room.id}
                  value={room.id}
                >{room.title}</li>
              )
            })
            }
          </ul>
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    checkInLocations: startData.locations.filter((location) => location.children.length > 0)
  }
}

export default connect(mapStateToProps)(RoomCheckIn)
