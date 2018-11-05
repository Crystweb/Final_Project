import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

class CheckInHistoryForSelectedDate extends Component {
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

  render () {
      const {floors, history} = this.props
      const currentFloor = floors.find(floor => floor.id = this.state.floorId)
      const checkForCurrentFloor = history
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
          <h3>3333</h3>
          <div>

          </div>
        </div>
      )
    }
}

const mapStateToProps = ({checkIn, startData}) => {
  return {
    floors: startData.locations.filter(location => location.children.length > 0)
  }
}



export default connect(mapStateToProps)(CheckInHistoryForSelectedDate)