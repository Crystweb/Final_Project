import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import Select from 'react-select'
import Point from '../../components/Point'
import dateFormat from 'dateformat'

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

    const styles = {
      dropdownIndicator: (base, state) => ({
      }),
      placeholder: (base, state) => ({
      }),
      valueContainer: (base, state) => ({
      }),
      control: (base, state) => ({
      }),
      indicatorsContainer: (base, state) => ({
      }),
      input: (base, start) => ({
        display: "none"
      })
    }

    let floorsOptions = []

    /* eslint-disable */
    floors && floors.map(location => {
      floorsOptions.push({value: location.id, label: location.title})
    })
    /* eslint-enable */

    const floorChoice =
      <Select
        styles={styles}
        className='floors__select'
        classNamePrefix="react-select"
        options={floorsOptions}
        value={floorsOptions.find(floor => floor.value === currentFloor.id)}
        onChange={value => this.setState({floorId: +value.value})}
        placeholder={currentFloor.title}
      />

      return (
        <div className="checkIn-wrap">
          {floorChoice}
          <ul className="tasks-list">
            {checkForCurrentFloor
              .sort((item1, item2) => item2.created - item1.created)
              .map(check => {
              return <li className="tasks-list__elem" key={check.id}>
                <Point/>
                <p className="chekIn-location">{check.location.title}</p>
                <p className="checkIn-delegator">{check.employee.forename} {check.employee.surname}</p>
                <p className="checkIn-date">{"Выполнено: " + dateFormat(check.created, "dd mmmm в HH:MM")}</p>
              </li>
            })}
          </ul>
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