import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

class CheckInHistoryForSelectedDate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      floorId: props.floors[0].id
    }
  }

  render () {
      const {floors, history} = this.props
      const currentFloor = floors.find(floor => floor.id === this.state.floorId)
    const checkForCurrentFloor = (history || [])
        .filter(check => currentFloor.children.some(child => child.id === check.location.id))

    const floorChoice = (
        <div>
          <select onChange={(e) => this.setState({floorId: +e.target.value})}>
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
            {checkForCurrentFloor.map(check => {
              return <div key={check.id}>
                <span>{check.employee.forename} {check.employee.surname}</span>
                <span>{check.location.title}</span>
                <span>{new Date(check.created).toLocaleString()}</span>
              </div>
            })}
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