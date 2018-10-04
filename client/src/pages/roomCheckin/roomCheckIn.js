import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../../styles/RoomCheckIn.css'

class RoomCheckIn extends Component {
  render () {
    const {checkInLocations} = this.props
    return (
      <Fragment>
        <div className='floors'>
          {checkInLocations && checkInLocations.map(location => {
            return <div
              key={location.id}
              className='floors__item'
            >
              <input
                name='floor'
                type='radio'
                value={location.id}
              />
              <label htmlFor="floor">{location.title}</label>
            </div>
          })}
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
